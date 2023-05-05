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

  public dateDepart!: Date;

  public dateArrive!: Date;

  public timeDepart!: string;

  public timeArrive!: string;

  public min!: string;

  constructor(
    public convertMoneyService: ConvertMoneyService,
  ) {}

  ngOnInit(): void {
    this.isTrip = !!this.selectTrip.flightNo;
    this.dateDepart = new Date(this.selectTrip.departDate);
    this.dateArrive = new Date(this.selectTrip.arriveDate);
    this.timeDepart = this.selectTrip.departDate.split(' ')[1]?.slice(0, -3);
    this.timeArrive = this.selectTrip.arriveDate.split(' ')[1]?.slice(0, -3);
    this.min = this.selectTrip?.flightTime;
  }

  public get getFlightTime() {
    const minutes = +this.min;
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return +this.min ? `${hh}h ${mm}m` : '0h 0m';
  }
}
