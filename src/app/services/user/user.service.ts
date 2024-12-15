import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../cookie/cookie.service';
import { User } from '../../models/user.model';
import { Observable, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { BackendUrlService } from '../backendUrl/backend-url.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl$: Observable<string>;

  pseudoCookieName = 'userPseudo';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private backendUrlService: BackendUrlService,
  ) {
    this.apiUrl$ = this.backendUrlService.getUserUrl();
  }

  login(pseudo: string): Observable<User> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        this.cookieService.setCookie(this.pseudoCookieName, pseudo, 3);
        return this.http.post<User>(`${apiUrl}/users`, { pseudo });
      }),
    );
  }

  logout(pseudo: string): Observable<User> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => {
        this.cookieService.eraseCookie(this.pseudoCookieName);
        return this.http.post<User>(`${apiUrl}/logout`, { pseudo });
      }),
    );
  }

  getUsers(): Observable<User[]> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) => this.http.get<User[]>(`${apiUrl}/users`)),
    );
  }

  getIsConnected(pseudo: string): Observable<boolean> {
    return this.apiUrl$.pipe(
      switchMap((apiUrl) =>
        this.http.get<boolean>(`${apiUrl}/user/connection?pseudo=${pseudo}`),
      ),
    );
  }
}
