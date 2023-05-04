/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export default class CalendarComponent implements OnInit, AfterViewInit {
  @Input() date!: Date;

  public arriveDates: Trip[] = [];

  private dayContainer!: HTMLElement;

  constructor(
    private r: Renderer2,
    private calendarService: CalendarService,
  ) {}

  @ViewChild('daysWrapper') daysWrapper!: ElementRef;

  ngOnInit(): void {
    this.calendarService.arriveDates$.subscribe((res) => {
      this.arriveDates = res;
      this.initCalendar();
    });
  }

  ngAfterViewInit(): void {
    this.dayContainer = this.daysWrapper.nativeElement;
  }

  public prevMonthDays:Trip[] = [];

  public monthDays:Trip[] = [];

  public nextMonthDays:Trip[] = [];

  private count = 4;

  private interval = 100 / 7;

  public viewSliderCount = 0;

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
      this.prevMonthDays.push({
        ...this.calendarService.defaultTrip,
        day: (prevLastDay - x + 1).toString(),
        arriveDate: this.calendarService.getDate(
          (prevLastDay - x + 1).toString(),
          date.getMonth() - 1,
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    for (let i = 1; i <= lastDay; i += 1) {
      this.monthDays.push({
        ...this.calendarService.defaultTrip,
        day: i.toString(),
        arriveDate: this.calendarService.getDate(
          (i).toString(),
          date.getMonth(),
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    for (let j = 0; j <= nextDays; j += 1) {
      this.nextMonthDays.push({
        ...this.calendarService.defaultTrip,
        day: (j + 1).toString(),
        arriveDate: this.calendarService.getDate(
          (j + 1).toString(),
          date.getMonth() + 1,
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    if (this.prevMonthDays.length === 7) this.prevMonthDays = [];
    if (this.nextMonthDays.length === 7) this.nextMonthDays = [];

    this.setArrives(this.prevMonthDays);
    this.setArrives(this.monthDays);
    this.setArrives(this.nextMonthDays);
  }

  setArrives(months: Trip[]) {
    let count = 1;
    this.arriveDates.forEach((arrive) => {
      const dateArr = arrive.arriveDate.slice(0, -9).split('.');
      const date = this.calendarService.getDate(dateArr[0], +dateArr[1] - 1, dateArr[2]);
      months.forEach((item, i) => {
        if (date.toString() === item.arriveDate) {
          months[i] = {
            ...item,
            ...arrive,
          };

          if (count) {
            this.calendarService.setTrip(this.monthDays[i]);
            count = 0;
          }
        }
      });
    });
  }

  private changedWidthViewSlider() {
    this.count = Math.round(this.calendarDays / 7) - 1;
  }

  private get calendarDays() {
    return [
      ...this.prevMonthDays,
      ...this.monthDays,
      ...this.nextMonthDays,
    ].length;
  }

  private get prevLength() {
    return this.prevMonthDays.length;
  }

  private get nextLength() {
    return this.nextMonthDays.length;
  }

  public prev() {
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
    this.r.setStyle(
      this.dayContainer,
      'transform',
      `translateX(${this.viewSliderCount}%)`,
    );
  }

  public next() {
    this.viewSliderCount -= this.interval;

    if (this.viewSliderCount < -(this.interval * this.count)) {
      this.date.setMonth(this.date.getMonth() + 1);
      this.initCalendar();
      this.changedWidthViewSlider();
      this.viewSliderCount = this.prevLength ? -this.interval : 0;
    }
    this.r.setStyle(
      this.dayContainer,
      'transform',
      `translateX(${this.viewSliderCount}%)`,
    );
  }

  changeTrip(i: number) {
    this.calendarService.setTrip(this.monthDays[i]);
    // eslint-disable-next-line no-console
    console.log(this.monthDays[i]);
  }
}
