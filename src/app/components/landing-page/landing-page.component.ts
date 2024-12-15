import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  features = [
    {
      icon: 'group',
      title: 'Connectes-toi',
      description:
        'Rencontres des partenaires partageant ta passions et tes objectifs.',
    },
    {
      icon: 'sports_soccer',
      title: 'Participe',
      description: 'Organises ou rejoins des événements sportifs.',
    },
    {
      icon: 'emoji_events',
      title: 'Évolues',
      description:
        'Améliores tes performances et atteignes tes rêves en équipe.',
    },
  ];

  steps = [
    {
      title: '1. Identifies-toi',
      description: 'Utilises un pseudo pour être reconnu par la communauté.',
    },
    {
      title: '2. Recherches',
      description:
        'Trouves des partenaires via la carte ou dans la liste des événements.',
    },
    {
      title: '3. Participes',
      description: 'Rejoins un événement existant ou crées le tiens.',
    },
  ];

  constructor(private router: Router) {}

  navigateToApp() {
    this.router.navigate(['/app']);
  }
}
