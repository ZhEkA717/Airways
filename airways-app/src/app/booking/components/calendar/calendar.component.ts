import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export default class CalendarComponent implements OnInit, AfterViewInit {
  @Input() date!: Date;

  private dayContainer!: HTMLElement;

  constructor(
    private r: Renderer2,
  ) {}

  @ViewChild('daysWrapper') daysWrapper!: ElementRef;

  ngOnInit(): void {
    this.initCalendar();
  }

  ngAfterViewInit(): void {
    this.dayContainer = this.daysWrapper.nativeElement;
  }

  public prevMonthDays:number[] = [];

  public monthDays:number[] = [];

  public nextMonthDays:number[] = [];

  public viewSliderCount = 0;

  private count = 4;

  private interval = 100 / 7;

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
}
