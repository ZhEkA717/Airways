import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Trip } from 'src/app/shared/model/trip.model';
import { Store } from '@ngrx/store';
import { selectBackTrip, selectThereTrip } from 'src/app/redux/selectors/flight.selector';
import SeatsCountService from '../services/seats-count.service';

@Directive({
  selector: '[appSeatsCount]',
})
export default class SeatsCountDirective implements OnInit {
  @Input() day!: Trip;

  @Input() isRound!: boolean;

  private backSelect!: string | undefined;

  private thereSelect!: string | undefined;

  constructor(
    private store: Store,
    private r: Renderer2,
    private el: ElementRef,
    private seatsCountService: SeatsCountService,
  ) {}

  ngOnInit(): void {
    this.store.select(selectBackTrip).subscribe((back) => {
      const { day, seats } = back;
      this.backSelect = day;
      if (this.isRound) this.selectTripStyle(day, seats);
    });
    this.store.select(selectThereTrip).subscribe((there) => {
      const { day, seats } = there;
      this.thereSelect = day;
      if (!this.isRound) this.selectTripStyle(day, seats);
    });
  }

  private selectTripStyle(
    day: string | undefined,
    seats: number,
  ) {
    this.day.day === day && this.day.price
      ? this.setStyleTrip(seats)
      : this.resetStyleTrip();
  }

  @HostListener('mouseenter', ['$event.target'])
  onMouseEnter(el: HTMLElement) {
    this.r.setStyle(el, 'borderTop', `${this.seatsCountService.getColor(this.day.seats)}`);
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseLeave(el: HTMLElement) {
    if ((this.backSelect !== this.day.day && this.isRound)
    || (this.thereSelect !== this.day.day && !this.isRound)) {
      this.r.setStyle(el, 'borderTop', '');
    }
  }

  setStyleTrip(seatsFree: number) {
    this.r.setStyle(this.el.nativeElement, 'borderTop', `${this.seatsCountService.getColor(seatsFree)}`);
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
}
