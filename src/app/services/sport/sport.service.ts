import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  private sportsUrl = 'assets/sports.json';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<string[]> {
    return this.http.get<{ [key: string]: string[] }>(this.sportsUrl).pipe(
      map((sports) => {
        const categories = Object.keys(sports);
        return categories;
      }),
      catchError((error) => {
        console.error('getCategories failed: ', error);
        return of([]);
      }),
    );
  }

  getSportsByCategory(category: string): Observable<string[]> {
    return this.http.get<{ [key: string]: string[] }>(this.sportsUrl).pipe(
      map((sports) => {
        const sportsForCategory = sports[category] || [];
        return sportsForCategory;
      }),
      catchError((error) => {
        console.error('getSportsByCategory failed: ', error);
        return of([]);
      }),
    );
  }
}
