import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  geocodeLocation(address: string): Observable<number[]> {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    return this.http.get<any[]>(apiUrl).pipe(
      map((response: any[]) => {
        if (response && response.length > 0) {
          const latitude = parseFloat(response[0].lat);
          const longitude = parseFloat(response[0].lon);
          return [longitude, latitude];
        } else {
          throw new Error('Aucune coordonnée trouvée pour cette adresse.');
        }
      }),
      catchError((error: any) => {
        throw new Error("Erreur lors de la géocodage de l'adresse.");
      }),
    );
  }

  decodeLocation(coordinates: number[]): Observable<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${coordinates[1]}&lon=${coordinates[0]}&format=json`;

    return this.http.get<any>(apiUrl).pipe(
      map((response: any) => {
        if (response && response.address) {
          let address = response.address;
          let city =
            address.city ||
            address.town ||
            address.village ||
            address.hamlet ||
            address.locality ||
            '';
          let country = address.country || '';
          return `${city}, ${country}`;
        } else {
          throw new Error('Adresse introuvable pour ces coordonnées.');
        }
      }),
      catchError((error: any) => {
        throw new Error("Erreur lors de la récupération de l'adresse.");
      }),
    );
  }
}
