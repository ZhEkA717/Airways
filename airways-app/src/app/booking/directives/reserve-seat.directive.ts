import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBackSeats, selectThereSeats } from 'src/app/redux/selectors/flight.selector';
import { Subscription } from 'rxjs';
import ReserveSeatService from '../services/reserve-seat.service';

@Directive({
  selector: '[appReserveSeat]',
})
export default class ReserveSeatDirective implements OnInit, OnDestroy {
  @Input() passengerLength!: number;

  @Input() isRound!: boolean;

  @Input() elSeat!: HTMLElement;

  @Input() seat!: string;

  @Input() k!: number;

  public isReserved = false;

  private thereSeats$ = this.store.select(selectThereSeats);

  private backSeats$ = this.store.select(selectBackSeats);

  private subThereSeats!: Subscription;

  private subBackSeats!: Subscription;

  private thereSeats: string[] = [];

  private backSeats: string[] = [];

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private store: Store,
    private reserveSeatService: ReserveSeatService,
  ) {}

  ngOnInit(): void {
    this.subThereSeats = this.thereSeats$.subscribe((seats) => {
      this.thereSeats = seats;
    });
    this.subBackSeats = this.backSeats$.subscribe((seats) => {
      this.backSeats = seats;
    });

    this.saveStateSeats(this.isRound ? this.backSeats : this.thereSeats);
  }

  ngOnDestroy(): void {
    this.subBackSeats?.unsubscribe();
    this.subThereSeats?.unsubscribe();
  }

  private saveStateSeats(seats: string[]) {
    seats.forEach((item) => {
      const number = item?.slice(0, -1);
      const letter = item?.substring(item.length - 1);
      const length = this.isRound
        ? this.reserveSeatService.getReservedLengthBack
        : this.reserveSeatService.getReservedLengthThere;
      if (this.seat === letter
          && this.k + 1 === +number
          && length) {
        this.isReserved = true;
        this.setStyle();
      }
    });
  }

  @HostListener('click')
  onClick() {
    this.isReserved ? this.resetReservedStyle() : this.setReservedStyle();

    this.isReserved = !this.isReserved;
  }

  private setReservedStyle() {
    if (this.isRound) {
      if (this.reserveSeatService.getReservedLengthBack
        !== this.passengerLength && !this.elSeat.classList.contains('disabled')) {
        this.reserveSeatService.setReservedBack(`${this.k + 1}${this.seat}`);
        this.setStyle();
      }
    } else if (this.reserveSeatService.getReservedLengthThere
        !== this.passengerLength && !this.elSeat.classList.contains('disabled')) {
      this.reserveSeatService.setReservedThere(`${this.k + 1}${this.seat}`);
      this.setStyle();
    }
  }

  private resetReservedStyle() {
    if (!this.elSeat.classList.contains('disabled')) {
      if (this.isRound) {
        this.reserveSeatService.deleteReservedBack(`${this.k + 1}${this.seat}`);
        this.resetStyle();
      } else {
        this.reserveSeatService.deleteReservedThere(`${this.k + 1}${this.seat}`);
        this.resetStyle();
      }
    }
  }

  private setStyle() {
    this.r.setStyle(this.el.nativeElement, 'background', 'orange');
    this.r.setStyle(this.el.nativeElement, 'color', '#ffffff');
  }

  private resetStyle() {
    this.r.setStyle(this.el.nativeElement, 'background', '');
    this.r.setStyle(this.el.nativeElement, 'color', '');
  }
}
