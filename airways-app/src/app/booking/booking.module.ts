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
import OneDateComponent from './components/one-date/one-date.component';
import CalendarComponent from './components/calendar/calendar.component';
import CalendarService from './services/calendar.service';
import SelectTripComponent from './components/select-trip/select-trip.component';
import ToFloorPipe from './pipes/to-floor.pipe';
import SeatsCountDirective from './directives/seats-count.directive';
import SelectSeatsDirective from './directives/select-seats.directive';
import SeatsCountService from './services/seats-count.service';
import TotalComponent from './components/total/total.component';
import TotalService from './services/total.service';

@NgModule({
  declarations: [
    SecondMenuComponent,
    BookingPageComponent,
    FlightComponent,
    PassengersComponent,
    ReviewComponent,
    SummaryTripComponent,
    SummaryPassengerItemComponent,
    OneDateComponent,
    CalendarComponent,
    SelectTripComponent,
    ToFloorPipe,
    SeatsCountDirective,
    SelectSeatsDirective,
    TotalComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ],
  providers: [
    CalendarService,
    SeatsCountService,
    TotalService,
  ],
})
export default class BookingModule { }
