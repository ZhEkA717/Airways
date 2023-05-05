import { Component, DoCheck, Input } from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements DoCheck {
  @Input() isRound!: boolean;

  @Input() selectTrip: Trip = <Trip>{};

  public dateDepart!: Date;

  public dateArrive!: Date;

  public timeDepart!: string;

  public timeArrive!: string;

  public min!: string;

  public flightNo!: string;

  public price!: number;

  public seats!: number;

  ngDoCheck(): void {
    const isTrip = !!this.selectTrip?.flightNo;
    this.dateDepart = isTrip ? new Date(this.selectTrip.departDate) : new Date();
    this.dateArrive = isTrip ? new Date(this.selectTrip.arriveDate) : new Date();
    this.timeDepart = isTrip ? this.selectTrip.departDate.split(' ')[1]?.slice(0, -3) : '';
    this.timeArrive = isTrip ? this.selectTrip.arriveDate.split(' ')[1]?.slice(0, -3) : '';
    this.min = this.selectTrip?.flightTime;
    this.flightNo = isTrip ? this.selectTrip.flightNo : '0';
    this.price = isTrip ? this.selectTrip.price : 0;
    this.seats = isTrip ? this.selectTrip.seats : 0;
  }

  public get getFlightTime() {
    const minutes = +this.min;
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return `${hh}h ${mm}m`;
  }
}
