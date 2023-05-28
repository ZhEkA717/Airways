import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import MainRoutingModule from './main-routing.module';
import FlightFormComponent from './flight-form/flight-form.component';
import FlightSearchPageComponent from './flight-search-page/flight-search-page.component';
import SharedModule from '../shared/shared.module';

@NgModule({
  declarations: [
    FlightFormComponent,
    FlightSearchPageComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
})
export default class MainModule { }
