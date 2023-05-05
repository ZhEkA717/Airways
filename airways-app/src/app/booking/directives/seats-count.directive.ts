import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import CalendarService from '../services/calendar.service';

const SEATS_ALL = 140;

@Directive({
  selector: '[appSeatsCount]',
})
export default class SeatsCountDirective implements OnInit {
  @Input() day!: Trip;

  @Input() isRound!: boolean;

  private backSelect!: string | undefined;

  private thereSelect!: string | undefined;

  constructor(
    private calendarService: CalendarService,
    private r: Renderer2,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.calendarService.tripBack$.subscribe((back) => {
      const { day, seats } = back;
      this.backSelect = day;
      if (this.isRound) {
        if (this.day.day === day) {
          this.setStyleTrip(seats);
        } else {
          this.resetStyleTrip();
        }
      }
    });
    this.calendarService.tripThere$.subscribe((there) => {
      const { day, seats } = there;
      this.thereSelect = day;
      if (!this.isRound) {
        if (this.day.day === day) {
          this.setStyleTrip(seats);
        } else {
          this.resetStyleTrip();
        }
      }
    });
  }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(el: HTMLElement) {
    this.r.setStyle(el, 'borderTop', `${this.getColor(this.day.seats)}`);
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(el: HTMLElement) {
    if ((this.backSelect !== this.day.day && this.isRound)
    || (this.thereSelect !== this.day.day && !this.isRound)) {
      this.r.setStyle(el, 'borderTop', '');
    }
  }

  setStyleTrip(seatsFree: number) {
    this.r.setStyle(this.el.nativeElement, 'borderTop', `${this.getColor(seatsFree)}`);
    this.r.setStyle(this.el.nativeElement, 'height', '100px');
    this.r.setStyle(this.el.nativeElement, 'boxShadow', '1px 0 0 0 #CECECE');
    this.r.setStyle(this.el.nativeElement, 'gap', '6px');
  }

  resetStyleTrip() {
    this.r.setStyle(this.el.nativeElement, 'borderTop', '');
    this.r.setStyle(this.el.nativeElement, 'height', '');
    this.r.setStyle(this.el.nativeElement, 'boxShadow', '');
    this.r.setStyle(this.el.nativeElement, 'gap', '');
  }

  private getColor(seatsFree: number, seats = SEATS_ALL) {
    const half = seats / 2;
    if (seatsFree > half) return '3px solid green';
    if (seatsFree < half) return '3px solid orange';
    if (seatsFree < 10) return '3px solid red';
    return '1px solid #CECECE';
  }
}
