import { Component, OnInit } from '@angular/core';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-select-trip',
  templateUrl: './select-trip.component.html',
  styleUrls: ['./select-trip.component.scss'],
})
export default class SelectTripComponent implements OnInit {
  public dateDepart: Date = new Date();

  public dateArrive: Date = new Date();

  public timeDepart: Date = new Date();

  public timeArrive: Date = new Date();

  public min!: string;

  constructor(public calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.trip$.subscribe((item) => {
      const dateDepartArr = item?.departDate.slice(0, 10).split('.');
      const dateArriveArr = item?.arriveDate.slice(0, 10).split('.');

      const dateDepart = this.calendarService.getDate(
        dateDepartArr[0],
        +dateDepartArr[1] - 1,
        dateDepartArr[2],
      );

      const dateArrive = this.calendarService.getDate(
        dateArriveArr[0],
        +dateArriveArr[1] - 1,
        dateArriveArr[2],
      );

      this.dateDepart = item.id ? dateDepart : new Date();
      this.dateArrive = item.id ? dateArrive : new Date();
    });
  }

  public get getTime() {
    const minutes = +this.min;
    const hh = Math.round(minutes / 60);
    const mm = minutes - hh * 60;
    return `${hh}h ${mm}m`;
  }
}
