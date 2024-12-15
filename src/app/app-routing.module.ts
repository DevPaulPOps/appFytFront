import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { MapAndListComponent } from './components/map-and-list/map-and-list.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'app',
    component: EventFormComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'event-form', component: EventFormComponent },
  { path: 'event-form/:id', component: EventFormComponent },
  { path: 'map-and-list', component: MapAndListComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
