import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HeaderService from 'src/app/core/services/header.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export default class ReviewComponent implements OnInit {
  constructor(
    private headerService: HeaderService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.headerService.setStepper({
      flight: true, passengers: true, review: true,
    });
  }

  toPassengers() {
    this.router.navigate(['booking', 'passengers']);
  }
}
