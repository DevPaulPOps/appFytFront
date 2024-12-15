import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendUrlService {
  private backendUrl!: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.backendUrl = new BehaviorSubject<string>('wait');
    this.loadBackendUrl();
  }

  getBackendUrl(): Observable<string> {
    return this.backendUrl.asObservable();
  }

  getEventsUrl(): Observable<string> {
    return this.backendUrl.pipe(
      filter((url) => url !== 'wait'),
      map((url) => `${url}/api/events`),
    );
  }
  getUserUrl(): Observable<string> {
    return this.backendUrl.pipe(
      filter((url) => url !== 'wait'),
      map((url) => `${url}/api`),
    );
  }

  private loadBackendUrl(): void {
    this.http
      .get<string>(
        `${environment.backendConfigUrl}/service/backendfytapp-image`,
      )
      .subscribe({
        next: (url) => this.backendUrl.next(url),
        error: (err) => console.error('Failed to fetch backend URL:', err),
      });
  }
}
