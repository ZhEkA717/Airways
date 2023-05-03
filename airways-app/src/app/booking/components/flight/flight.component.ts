import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import HeaderService from 'src/app/core/services/header.service';
import HttpApiService from 'src/app/core/services/http-api.service';
import { selectSearch } from 'src/app/redux/selectors/search.selector';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.scss'],
})
export default class FlightComponent implements OnInit, OnDestroy {
  private search$ = this.store.select(selectSearch);

  private subSearch!: Subscription;

  public date = new Date();

  public month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  public lastDay!: number;

  public prevLastDay!: number;

  public firstDayIndex!: number;

  public lastDayIndex!: number;

  public nextDays!: number;

  public monthDays: number[] = [];

  public prevMonthDays: number[] = [];

  public nextMonthDays: number[] = [];

  public fromDay = 1;

  public toDay = 7;

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private httpApiService: HttpApiService,
  ) {}

  initCalendar() {
    this.date.setDate(1);

    this.monthDays = [];
    this.prevMonthDays = [];
    this.nextMonthDays = [];

    this.lastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0,
    ).getDate();

    this.prevLastDay = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0,
    ).getDate();

    this.firstDayIndex = this.date.getDay();

    this.date.setDate(this.lastDay);

    this.lastDayIndex = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0,
    ).getDay();

    this.nextDays = 7 - this.lastDayIndex;

    for (let i = 1; i <= this.lastDay; i += 1) {
      this.monthDays.push(i);
    }

    for (let i = this.firstDayIndex - 1; i > 0; i -= 1) {
      this.prevMonthDays.push(this.prevLastDay - i + 1);
    }
    for (let i = 1; i <= this.nextDays; i += 1) {
      this.nextMonthDays.push(i);
    }
    this.monthDays = [
      ...this.prevMonthDays,
      ...this.monthDays,
      ...this.nextMonthDays,
    ];

    console.log(this.monthDays);
  }

  ngOnInit(): void {
    this.initCalendar();

    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });

    this.subSearch = this.search$.subscribe((search) => {
      const { from, destination } = search;
      this.httpApiService.getAvailableTrips(
        from.slice(-3),
        destination.slice(-3),
      )
        .subscribe((res) => {
          // eslint-disable-next-line no-console
          console.log(res);
        });
    });
  }

  ngOnDestroy(): void {
    this.subSearch?.unsubscribe();
  }

  prev() {
    if (this.fromDay === 1) {
      this.date.setMonth(this.date.getMonth() - 1);
      this.initCalendar();
      this.fromDay = 1;
      this.toDay = 7;
    }

    this.fromDay -= 7;
    this.toDay -= 7;
  }

  next() {
    if (this.toDay >= this.lastDay) {
      console.log('next');
      this.date.setMonth(this.date.getMonth() + 1);
      this.initCalendar();
      this.fromDay = 1;
      this.toDay = 7;
      console.log(this.date);
    }

    this.fromDay += 7;
    this.toDay += 7;
  }
}
