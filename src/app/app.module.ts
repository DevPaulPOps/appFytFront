import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { FooterComponent } from './components/footer/footer.component';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './components/auth/auth-button/auth-button.component';
import { UserProfileComponent } from './components/auth/user-profile/user-profile.component';
import { PseudoNameComponent } from './components/pseudo-name/pseudo-name.component';
import { MatSelect } from '@angular/material/select';
import { ImageModule } from 'primeng/image';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AccordionModule } from 'primeng/accordion';
import { StepperModule } from 'primeng/stepper';
import { CardModule } from 'primeng/card';
import { MapAndListComponent } from './components/map-and-list/map-and-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import {
  StreamAutocompleteTextareaModule,
  StreamChatModule,
} from 'stream-chat-angular';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/chat/message/message.component';
import { ChannelPreviewComponent } from './components/chat/channel-preview/channel-preview.component';
import { BlockUIModule } from 'primeng/blockui';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    EventFormComponent,
    FooterComponent,
    LandingPageComponent,
    NavbarComponent,
    AuthButtonComponent,
    UserProfileComponent,
    PseudoNameComponent,
    EventFormComponent,
    MapAndListComponent,
    ChatComponent,
    MessageComponent,
    ChannelPreviewComponent,
  ],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatToolbar,
    MatCardModule,
    FlexLayoutModule,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    MatAccordion,
    MatGridList,
    MatGridTile,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,

      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'appFyt-api',
      },

      httpInterceptor: {
        allowedList: [
          {
            uri: environment.apiUrlBackend,
          },
        ],
      },
    }),
    MatSelect,
    MatOption,
    ImageModule,
    SidebarModule,
    ButtonModule,
    AvatarModule,
    AccordionModule,
    StepperModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    CarouselModule,
    BlockUIModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
