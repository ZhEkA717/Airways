import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import AppRoutingModule from './app-routing.module';
import AppComponent from './app.component';
import CoreModule from './core/core.module';
import LoginComponent from './auth/components/login/login.component';
import RegistrationComponent from './auth/components/registration/registration.component';
import SharedModule from './shared/shared.module';
import { metaReducers, reducers } from './redux';
import AuthDialogComponent from './auth/components/auth-dialog/auth-dialog.component';
import ReliableColorDirective from './auth/directives/reliable-color.directive';
import TextColorDirective from './auth/directives/text-color.directive';
import StatisticsService from './auth/services/statistics.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AuthDialogComponent,
    ReliableColorDirective,
    TextColorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot(),
  ],
  providers: [StatisticsService],
  bootstrap: [AppComponent],
})
export default class AppModule { }
