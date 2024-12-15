import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Event } from '../../models/event.model';
import { BackendUrlService } from '../backendUrl/backend-url.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl$: Observable<string>;
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$: Observable<Event[]> = this.eventsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private backendUrlService: BackendUrlService,
  ) {
    this.apiUrl$ = backendUrlService.getEventsUrl();
    console.log(this.apiUrl$);
    this.loadInitialEvents();
  }

  addEvent(organizer: string, eventData: Event): Observable<Event> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) =>
        this.http.post<Event>(`${apiUrl}`, { organizer, ...eventData }),
      ),
      map((event) => {
        const updatedEvents = [...this.eventsSubject.value, event];
        this.eventsSubject.next(updatedEvents);
        return event;
      }),
    );
  }

  getEvents(): Observable<Event[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => this.http.get<Event[]>(apiUrl)),
    );
  }

  getEvent(eventId: string): Observable<Event> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => this.http.get<Event>(`${apiUrl}/${eventId}`)),
    );
  }

  updateEvent(
    eventId: string,
    organizer: string,
    eventData: Event,
  ): Observable<Event> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) =>
        this.http.put<Event>(`${apiUrl}/${eventId}`, {
          ...eventData,
          organizer,
        }),
      ),
      map((updatedEvent) => {
        const events = this.eventsSubject.value.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event,
        );
        this.eventsSubject.next(events);
        return updatedEvent;
      }),
    );
  }

  deleteEvent(
    eventId: string,
    organizer: string,
  ): Observable<{ message: string }> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) =>
        this.http.delete<{ message: string }>(`${apiUrl}/${eventId}`, {
          body: { organizer },
        }),
      ),
      map((response) => {
        const events = this.eventsSubject.value.filter(
          (event) => event._id !== eventId,
        );
        this.eventsSubject.next(events);
        return response;
      }),
    );
  }

  private loadInitialEvents(): void {
    this.getEvents().subscribe((events) => this.eventsSubject.next(events));
  }
}
