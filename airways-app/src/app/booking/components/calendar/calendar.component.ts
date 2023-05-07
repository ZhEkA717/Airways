/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import { Subject, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { saveBackTrip, saveThereTrip } from 'src/app/redux/actions/flight.action';
import { selectBackTrip, selectThereTrip } from 'src/app/redux/selectors/flight.selector';
import CalendarService from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export default class CalendarComponent
implements OnInit, AfterViewInit, OnDestroy {
  @Input() date!: Date;

  @Input() isRound!: boolean;

  public departDates: Trip[] = [];

  private dayContainer!: HTMLElement;

  public selectTrip: Trip = <Trip>{};

  public isTripObject!: boolean;

  private subBack!: Subscription;

  private subThere!: Subscription;

  private subWeek!: Subscription;

  private weekIndex$ = new Subject<number>();

  private thereTrip$ = this.store.select(selectThereTrip);

  private thereTrip!:Trip;

  private backTrip$ = this.store.select(selectBackTrip);

  private backTrip!:Trip;

  public prevMonthDays:Trip[] = [];

  public monthDays:Trip[] = [];

  public nextMonthDays:Trip[] = [];

  private count = 4;

  private interval = 100 / 7;

  public viewSliderCount = 0;

  public choiceTrip = true;

  constructor(
    private r: Renderer2,
    private calendarService: CalendarService,
    private store: Store,
  ) {}

  @ViewChild('daysWrapper') daysWrapper!: ElementRef;

  ngOnInit(): void {
    this.thereTrip$.subscribe((there) => {
      this.thereTrip = there;
    });

    this.backTrip$.subscribe((back) => {
      this.backTrip = back;
    });

    if (this.isRound) {
      this.subBack = this.calendarService.departDatesBack$.subscribe((res) => {
        this.departDates = res;
        this.initCalendar();
      });
    } else {
      this.subThere = this.calendarService.departDatesThere$.subscribe((res) => {
        this.departDates = res;
        this.initCalendar();
      });
    }
  }

  ngAfterViewInit(): void {
    this.dayContainer = this.daysWrapper.nativeElement;

    this.weekIndex$.subscribe((index) => {
      this.viewSliderCount = 0;
      for (let i = 0; i < index; i += 1) {
        this.next();
      }
    });
  }

  ngOnDestroy(): void {
    this.subBack?.unsubscribe();
    this.subThere?.unsubscribe();
    this.subWeek?.unsubscribe();
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
      this.prevMonthDays.push({
        ...<Trip>{},
        day: (prevLastDay - x + 1).toString(),
        departDate: this.calendarService.getDate(
          (prevLastDay - x + 1).toString(),
          date.getMonth() - 1,
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    for (let i = 1; i <= lastDay; i += 1) {
      this.monthDays.push({
        ...<Trip>{},
        day: i.toString(),
        departDate: this.calendarService.getDate(
          (i).toString(),
          date.getMonth(),
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    for (let j = 0; j <= nextDays; j += 1) {
      this.nextMonthDays.push({
        ...<Trip>{},
        day: (j + 1).toString(),
        departDate: this.calendarService.getDate(
          (j + 1).toString(),
          date.getMonth() + 1,
          date.getFullYear().toString(),
        ).toString(),
      });
    }

    if (this.prevMonthDays.length === 7) this.prevMonthDays = [];
    if (this.nextMonthDays.length === 7) this.nextMonthDays = [];

    this.setDepartDates(this.prevMonthDays);
    this.setDepartDates(this.nextMonthDays);
    this.setDepartDates(this.monthDays); // last call
  }

  setDepartDates(months: Trip[]) {
    let count = 1;
    this.departDates.forEach((depart) => {
      const dateWithoutTime = depart.departDate.slice(0, 10);
      const date = new Date(dateWithoutTime);
      months.forEach((item, i) => {
        if (date.toString() === item.departDate) {
          months[i] = {
            ...item,
            ...depart,
          };

          if (count) {
            this.selectTrip = months[i];
            this.saveTrips(this.selectTrip);
            this.isTripObject = true;
            this.weekIndex$.next(this.calendarService.week(
              new Date(this.selectTrip.departDate),
            ));
            count = 0;
          }
        }
      });
    });
    if (count) {
      this.selectTrip = <Trip>{};
      this.isTripObject = false;
    }
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

  public changeTrip(i: number, month: Trip[]) {
    const isTrip = month[i].flightNo;
    if (isTrip) {
      this.selectTrip = month[i];
      this.saveTrips(this.selectTrip);
    }
  }

  private saveTrips(trip: Trip) {
    if (this.isRound) {
      this.store.dispatch(saveBackTrip(trip));
    } else {
      this.store.dispatch(saveThereTrip(trip));
    }
  }

  public onSelectEvent(choiceTrip: boolean) {
    this.choiceTrip = choiceTrip;
    if (this.isRound) {
      this.calendarService.setBackSelect(this.choiceTrip);
    } else {
      this.calendarService.setThereSelect(this.choiceTrip);
    }
  }
}
