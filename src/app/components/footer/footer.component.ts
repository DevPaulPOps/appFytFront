import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  authorLink = 'https://github.com/paulpp78';
  learningPlaceLink = 'https://www.wevii.net/';
  supervisorLink = 'https://github.com/nikos9742';
  projectPurpose = 'Ce projet est à but éducatif.';
}
