import { Component, Input, OnInit } from '@angular/core';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements OnInit {
  @Input() isRound!: boolean;

  public dateDepart: Date = new Date();

  public dateArrive: Date = new Date();

  public timeDepart!: string;

  public timeArrive!: string;

  public min!: number;

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.trip$.subscribe((item) => {
      const isTrip = !!item.flightNo;

      this.dateDepart = isTrip ? new Date(item.departDate) : new Date();
      this.dateArrive = isTrip ? new Date(item.arriveDate) : new Date();

      this.timeDepart = isTrip
        ? item.departDate.split(' ')[1]?.slice(0, -3)
        : '';
      this.timeArrive = isTrip
        ? item.arriveDate.split(' ')[1]?.slice(0, -3)
        : '';

      this.min = +item.flightTime;
    });
  }

  public get getFlightTime() {
    const minutes = this.min;
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return `${hh}h ${mm}m`;
  }
}
