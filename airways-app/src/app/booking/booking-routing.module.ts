import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import BookingPageComponent from './pages/booking-page/booking-page.component';
import FlightComponent from './pages/flight/flight.component';
import PassengersComponent from './pages/passengers/passengers.component';
import ReviewComponent from './pages/review/review.component';
import { AuthGuard } from '../core/services/auth.guard';
import PassengersFormGuard from './guards/passengers-form.guard';

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
