import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-auth-button',
  template: `
    <ng-container *ngIf="auth.isAuthenticated$ | async; else loggedOut">
      <p-button
        label="Log out"
        [rounded]="true"
        (click)="
          auth.logout({ logoutParams: { returnTo: document.location.origin } })
        "
        severity="danger"
      >
      </p-button>
    </ng-container>

    <ng-template #loggedOut>
      <p-button
        label="Log in"
        [rounded]="true"
        (click)="auth.loginWithRedirect()"
      ></p-button>
    </ng-template>
  `,
  styles: [],
})
export class AuthButtonComponent {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
  ) {}
}
