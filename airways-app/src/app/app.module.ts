import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import CoreModule from './core/core.module';
import LoginComponent from './auth/login/login.component';
import RegistrationComponent from './auth/registration/registration.component';
import FlightFormComponent from './main/flight-form/flight-form.component';
import FlightSearchPageComponent from './main/flight-search-page/flight-search-page.component';
import SharedModule from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FlightFormComponent,
    FlightSearchPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export default class AppModule { }
