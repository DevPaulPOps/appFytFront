import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-pseudo-name',
  templateUrl: './pseudo-name.component.html',
  styleUrls: ['./pseudo-name.component.scss'],
})
export class PseudoNameComponent {
  constructor(public auth: AuthService) {}
}
