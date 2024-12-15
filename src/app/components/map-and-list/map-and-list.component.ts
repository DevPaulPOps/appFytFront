import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Event } from '../../models/event.model';
import * as L from 'leaflet';
import { EventService } from '../../services/event/event.service';
import { AuthService } from '@auth0/auth0-angular';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map-and-list',
  templateUrl: './map-and-list.component.html',
  styleUrl: './map-and-list.component.scss',
})
export class MapAndListComponent {
  events$!: Observable<Event[]>;
  userPseudo$: Observable<string>;
  userPseudo!: string;
  private map!: L.Map;
  private layers: L.Layer[] = [];
  private eventsSubscription!: Subscription;

  constructor(
    private eventService: EventService,
    private auth: AuthService,
  ) {
    this.userPseudo$ = this.auth.user$.pipe(
      map((user) => user?.nickname || user?.name || ''),
    );
    this.userPseudo$.subscribe((userPseudo) => {
      this.userPseudo = userPseudo;
    });
  }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    this.initializeMap();
    this.subscribeToEvents();
    this.userPseudo$.subscribe((userPseudo) => {
      this.userPseudo = userPseudo;
    });
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  deleteEvent(eventId: string, organizer: string): void {
    if (organizer) {
      this.eventService.deleteEvent(eventId, organizer).subscribe({
        next: () => {
          this.loadEvents();
          this.subscribeToEvents();
        },
        error: (error) => console.error('Error deleting the event', error),
      });
    } else {
      console.error("Organizer is undefined. Can't delete event.");
    }
  }

  loadEvents(): void {
    this.events$ = this.eventService.getEvents();
  }

  public updateMarkers(events: Event[]): void {
    this.layers.forEach((layer) => this.map.removeLayer(layer));
    this.layers = [];

    events.forEach((event) => {
      if (event.location && event.location.coordinates.length === 2) {
        const [lng, lat] = event.location.coordinates;
        const marker = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: '../../../assets/location-pin.png',
            iconSize: [38, 95],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
          }),
        })
          .bindPopup(this.createPopupContent(event))
          .addTo(this.map);
        this.layers.push(marker);
      }
    });
  }

  private initializeMap(): void {
    this.map = L.map('map').setView([46.232192999999995, 2.209666999999996], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'OpenStreetMap',
    }).addTo(this.map);
  }

  private subscribeToEvents(): void {
    this.events$.subscribe((events) => {
      console.log('Receiving events:', events);
      this.updateMarkers(events);
    });
  }

  private createPopupContent(event: Event): string {
    return `
      <div>
        <h3>${event.sport.name}</h3>
        <p>Organisé par : ${event.organizer}</p>
        <p>Date : ${event.date}</p>
        <p>Description : ${event.description}</p>
      </div>
    `;
  }
}
