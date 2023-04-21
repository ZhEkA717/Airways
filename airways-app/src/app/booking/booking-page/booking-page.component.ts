import { Component, OnInit } from '@angular/core';
import HeaderService from 'src/app/core/services/header.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export default class BookingPageComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setIsBooking(false);
  }
}
