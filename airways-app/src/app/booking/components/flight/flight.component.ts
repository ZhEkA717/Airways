import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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
export default class FlightComponent implements OnInit, OnDestroy, AfterViewInit {
  private search$ = this.store.select(selectSearch);

  private subSearch!: Subscription;

  public date = new Date();

  public months = [
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

  public prevMonthDays:number[] = [];

  public monthDays:number[] = [];

  public nextMonthDays:number[] = [];

  private dayContainer!: HTMLElement;

  private viewSliderCount = 0;

  count = 4;

  private interval = 100 / 7;

  constructor(
    private headerService: HeaderService,
    private store: Store,
    private httpApiService: HttpApiService,
    private r: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    this.dayContainer = this.daysWrapper.nativeElement;
  }

  initCalendar() {
    const { date } = this;

    date.setDate(1);

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDate();

    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0,
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0,
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    this.prevMonthDays = [];
    this.monthDays = [];
    this.nextMonthDays = [];

    for (let x = firstDayIndex - 1; x > 0; x -= 1) {
      this.prevMonthDays.push(prevLastDay - x + 1);
    }

    for (let i = 1; i <= lastDay; i += 1) {
      this.monthDays.push(i);
    }

    for (let j = 0; j <= nextDays; j += 1) {
      this.nextMonthDays.push(j + 1);
    }

    if (this.prevMonthDays.length === 7) this.prevMonthDays = [];
    if (this.nextMonthDays.length === 7) this.nextMonthDays = [];
  }

  prev() {
    this.viewSliderCount += this.interval;

    if (this.viewSliderCount > 0) {
      this.date.setMonth(this.date.getMonth() - 1);
      this.initCalendar();
      this.changedWidthViewSlider();
      if (this.nextLength) {
        this.viewSliderCount = -(this.interval * (this.count - 1));
      } else {
        this.viewSliderCount = -(this.interval * this.count);
      }
    }
    this.r.setStyle(this.dayContainer, 'transform', `translateX(${this.viewSliderCount}%)`);
  }

  next() {
    this.viewSliderCount -= this.interval;

    if (this.viewSliderCount < -(this.interval * this.count)) {
      this.date.setMonth(this.date.getMonth() + 1);
      this.initCalendar();
      this.changedWidthViewSlider();
      this.viewSliderCount = this.prevLength ? -this.interval : 0;
    }
    this.r.setStyle(this.dayContainer, 'transform', `translateX(${this.viewSliderCount}%)`);
  }

  changedWidthViewSlider() {
    this.count = Math.round(this.calendarDays / 7) - 1;
  }

  private get calendarDays() {
    return [
      ...this.prevMonthDays,
      ...this.monthDays,
      ...this.nextMonthDays,
    ].length;
  }

  get prevLength() {
    return this.prevMonthDays.length;
  }

  get nextLength() {
    return this.nextMonthDays.length;
  }

  @ViewChild('daysWrapper') daysWrapper!: ElementRef;

  ngOnInit(): void {
    this.initCalendar();


    this.headerService.setStepper({
      flight: true, passengers: false, review: false,
    });

    this.subSearch = this.search$.subscribe((search) => {
      const { from, destination, startDate } = search;
      this.date = new Date(startDate);
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
}
