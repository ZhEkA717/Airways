import { Component, OnInit } from '@angular/core';
import HeaderService from 'src/app/core/services/header.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export default class FlightComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });
  }
}
