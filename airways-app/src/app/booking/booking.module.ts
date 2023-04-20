import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BookingRoutingModule from './booking-routing.module';
import SecondMenuComponent from './components/second-menu/second-menu.component';
import BookingPageComponent from './booking-page/booking-page.component';
import SharedModule from '../shared/shared.module';

@NgModule({
  declarations: [
    SecondMenuComponent,
    BookingPageComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    SharedModule,
  ],
})
export default class BookingModule { }
