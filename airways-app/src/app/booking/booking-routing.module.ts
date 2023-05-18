import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import BookingPageComponent from './booking-page/booking-page.component';
import FlightComponent from './components/flight/flight.component';
import PassengersComponent from './components/passengers/passengers.component';
import ReviewComponent from './components/review/review.component';
import { AuthGuard } from '../core/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: BookingPageComponent,
    children: [
      {
        path: 'flight',
        component: FlightComponent,
        title: 'flight',
      },
      {
        path: 'passengers',
        component: PassengersComponent,
        canActivate: [AuthGuard],
        title: 'passengers',
      },
      {
        path: 'review',
        component: ReviewComponent,
        canActivate: [AuthGuard],
        title: 'review',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class BookingRoutingModule { }
