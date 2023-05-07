import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BookingRoutingModule from './booking-routing.module';
import SecondMenuComponent from './components/second-menu/second-menu.component';
import BookingPageComponent from './booking-page/booking-page.component';
import SharedModule from '../shared/shared.module';
import FlightComponent from './components/flight/flight.component';
import PassengersComponent from './components/passengers/passengers.component';
import ReviewComponent from './components/review/review.component';
import SummaryTripComponent from './components/summary-trip/summary-trip.component';
import SummaryPassengerItemComponent from './components/summary-passenger-item/summary-passenger-item.component';

@NgModule({
  declarations: [
    SecondMenuComponent,
    BookingPageComponent,
    FlightComponent,
    PassengersComponent,
    ReviewComponent,
    SummaryTripComponent,
    SummaryPassengerItemComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ],
})
export default class BookingModule { }
