import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import BookingRoutingModule from './booking-routing.module';
import SecondMenuComponent from './components/second-menu/second-menu.component';
import BookingPageComponent from './booking-page/booking-page.component';

@NgModule({
  declarations: [
    SecondMenuComponent,
    BookingPageComponent,
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
  ],
})
export default class BookingModule { }
