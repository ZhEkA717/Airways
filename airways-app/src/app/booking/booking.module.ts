import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BookingRoutingModule from './booking-routing.module';
import SecondMenuComponent from './components/second-menu/second-menu.component';
import BookingPageComponent from './booking-page/booking-page.component';
import SharedModule from '../shared/shared.module';
import FlightComponent from './components/flight/flight.component';
import PassengersComponent from './components/passengers/passengers.component';
import ReviewComponent from './components/review/review.component';
import OneDateComponent from './components/one-date/one-date.component';
import CalendarComponent from './components/calendar/calendar.component';
import CalendarService from './services/calendar.service';

@NgModule({
  declarations: [
    SecondMenuComponent,
    BookingPageComponent,
    FlightComponent,
    PassengersComponent,
    ReviewComponent,
    OneDateComponent,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ],
  providers: [CalendarService],
})
export default class BookingModule { }
