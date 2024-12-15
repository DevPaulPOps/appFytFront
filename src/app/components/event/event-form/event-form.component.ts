import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { EventService } from '../../../services/event/event.service';
import { SportService } from '../../../services/sport/sport.service';
import { formatDate } from '@angular/common';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { MapService } from '../../../services/map/map.service';
import { Event } from '../../../models/event.model';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  categories$!: Observable<string[]>;

  sports$!: Observable<string[]>;
  eventId?: string;
  organizer?: string;
  isUpdateMode: boolean = false;
  categories: { label: string; value: string }[] = [];
  sports: { label: string; value: string }[] = [];
  protected readonly HTMLSelectElement = HTMLSelectElement;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private sportService: SportService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private mapService: MapService,
  ) {
    this.eventForm = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      sportCategory: ['', Validators.required],
      sportName: ['', Validators.required],
    });
    this.categories$ = this.sportService.getCategories();
    this.sports$ = this.sportService.getSportsByCategory('');
  }

  ngOnInit(): void {
    this.sportService.getCategories().subscribe((categories) => {
      this.categories = categories.map((cat) => ({ label: cat, value: cat }));
    });

    this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id') || undefined;
      this.isUpdateMode = !!this.eventId;

      if (this.isUpdateMode && this.eventId) {
        this.eventService.getEvent(this.eventId).subscribe((event) => {
          this.loadEventData(event);
        });
      }
    });

    this.auth.user$.subscribe((user) => {
      if (!user) throw new Error("L'utilisateur n'est pas connecté.");
      this.organizer = user.nickname || user.email;
    });
  }

  onCategoryChange(category: any, callback?: () => void): void {
    const categoryValue = category.value;
    this.sportService.getSportsByCategory(categoryValue).subscribe((sports) => {
      this.sports = sports.map((sport) => ({ label: sport, value: sport }));
      if (callback) callback();
    });
  }

  loadEventData(event: Event): void {
    if (!event.location || !event.location.coordinates) {
      console.error(
        'Les données de localisation sont manquantes ou incomplètes.',
      );
      return;
    }

    this.mapService
      .decodeLocation(event.location.coordinates)
      .subscribe((address) => {
        const formattedDate = new Date(event.date);
        const categoryValue = event.sport.category;
        this.onCategoryChange({ value: categoryValue }, () => {
          this.eventForm.patchValue({
            description: event.description,
            date: formattedDate,
            location: address,
            sportCategory: event.sport.category,
            sportName: event.sport.name,
          });
        });
      });
  }

  onSubmit(): void {
    if (this.eventForm.valid && this.organizer) {
      const formValue = this.eventForm.value;
      const eventData: any = {
        organizer: this.organizer,
        description: formValue.description,
        date: formatDate(formValue.date, 'yyyy-MM-dd', 'en-US'),
        sport: {
          category: formValue.sportCategory.value,
          name: formValue.sportName.value,
        },
        location: {
          type: 'Point',
          coordinates: [],
          address: formValue.location,
        },
      };
      this.mapService
        .geocodeLocation(formValue.location)
        .pipe(
          switchMap((coordinates: number[]) => {
            eventData.location.coordinates = coordinates;
            console.log(
              'Ajout de l’événement:',
              eventData,
              'par:',
              this.organizer,
            );

            if (this.organizer) {
              if (this.eventId) {
                return this.eventService.updateEvent(
                  this.eventId,
                  this.organizer,
                  eventData,
                );
              } else {
                return this.eventService.addEvent(this.organizer, eventData);
              }
            }

            return EMPTY;
          }),
        )
        .subscribe({
          next: (result) => {
            if (result) {
              console.log('Opération réussie:', result);
              this.router.navigate(['/map-and-list']);
            }
          },
          error: (error) => {
            console.error('Erreur lors de la soumission du formulaire:', error);
          },
        });
    }
  }
}
