import { Component, OnInit } from '@angular/core';
import HeaderService from 'src/app/core/services/header.service';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
})
export default class PassengersComponent implements OnInit {
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: false, passengers: true, review: false,
    });
  }
}
