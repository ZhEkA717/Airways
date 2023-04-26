import { Component, OnInit } from '@angular/core';
import HeaderService from 'src/app/core/services/header.service';

@Component({
  selector: 'app-flight-search-page',
  templateUrl: './flight-search-page.component.html',
  styleUrls: ['./flight-search-page.component.scss'],
})
export default class FlightSearchPageComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setIsBooking(true);
  }
}
