import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import BookingPageComponent from './pages/booking-page/booking-page.component';
import FlightComponent from './pages/flight/flight.component';
import PassengersComponent from './pages/passengers/passengers.component';
import ReviewComponent from './pages/review/review.component';
import { AuthGuard } from '../core/services/auth.guard';
import PassengersFormGuard from './guards/passengers-form.guard';
import { ThereBookedResolver } from './there-booked.resolver';
import { BackBookedResolver } from './back-booked.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      {
        path: 'flight',
        component: FlightComponent,
        title: 'AIRWAYS | Booking | Flight',
      },
      {
        path: 'passengers',
        component: PassengersComponent,
        canActivate: [AuthGuard],
        canDeactivate: [PassengersFormGuard],
        title: 'AIRWAYS | Booking | Passengers',
        resolve: {
          thereBookedSeats: ThereBookedResolver,
          backBookedSeats: BackBookedResolver,
        },
      },
      {
        path: 'review',
        component: ReviewComponent,
        canActivate: [AuthGuard],
        title: 'AIRWAYS | Booking | Review',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BookingRoutingModule { }
