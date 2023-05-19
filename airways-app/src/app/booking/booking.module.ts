import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BookingRoutingModule from './booking-routing.module';
import SecondMenuComponent from './components/second-menu/second-menu.component';
import BookingPageComponent from './pages/booking-page/booking-page.component';
import SharedModule from '../shared/shared.module';
import FlightComponent from './pages/flight/flight.component';
import PassengersComponent from './pages/passengers/passengers.component';
import ReviewComponent from './pages/review/review.component';
import SummaryTripComponent from './components/summary-trip/summary-trip.component';
import SummaryPassengerItemComponent from './components/summary-passenger-item/summary-passenger-item.component';
import OneDateComponent from './components/one-date/one-date.component';
import CalendarComponent from './components/calendar/calendar.component';
import CalendarService from './services/calendar.service';
import SelectTripComponent from './components/select-trip/select-trip.component';
import SeatsCountDirective from './directives/seats-count.directive';
import SelectSeatsDirective from './directives/select-seats.directive';
import SeatsCountService from './services/seats-count.service';
import ReservedSeatsComponent from './components/reserved-seats/reserved-seats.component';
import ReserveSeatDirective from './directives/reserve-seat.directive';
import TotalComponent from './components/total/total.component';
import TotalService from './services/total.service';
import ToTimePipe from './pipes/to-time.pipe';

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
    ToTimePipe,
    SeatsCountDirective,
    SelectSeatsDirective,
    ReservedSeatsComponent,
    ReserveSeatDirective,
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
