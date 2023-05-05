import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import ConvertMoneyService from '../../services/convert-money.service';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements OnInit {
  @Input() isRound!: boolean;

  @Input() selectTrip: Trip = <Trip>{};

  public isTrip!: boolean;

  constructor(
    public convertMoneyService: ConvertMoneyService,
  ) {}

  ngOnInit(): void {
    this.isTrip = !!this.selectTrip.flightNo;
  }
}
