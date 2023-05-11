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
import { selectSeats } from 'src/app/redux/selectors/passengers.selector';
import { Subscription } from 'rxjs';
import ReserveSeatService from '../services/reserve-seat.service';

@Directive({
  selector: '[appReserveSeat]',
})
export default class ReserveSeatDirective implements OnInit, OnDestroy {
  @Input() passengerLength!: number;

  @Input() elSeat!: HTMLElement;

  @Input() seat!: string;

  @Input() k!: number;

  public isReserved = false;

  private seats$ = this.store.select(selectSeats);

  private subSeats!: Subscription;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private store: Store,
    private reserveSeatService: ReserveSeatService,
  ) {}

  ngOnInit(): void {
    this.subSeats = this.seats$.subscribe((seats) => {
      seats?.forEach((item) => {
        const number = item?.slice(0, -1);
        const letter = item?.substring(item.length - 1);
        if (this.seat === letter
            && this.k + 1 === +number
            && this.reserveSeatService.getReservedLength) {
          this.isReserved = true;
          this.r.setStyle(this.el.nativeElement, 'background', 'orange');
          this.r.setStyle(this.el.nativeElement, 'color', '#ffffff');
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.subSeats?.unsubscribe();
  }

  @HostListener('click')
  onClick() {
    if (this.isReserved) {
      this.resetReservedStyle();
    } else {
      this.setReservedStyle();
    }

    this.isReserved = !this.isReserved;
  }

  private setReservedStyle() {
    if (this.reserveSeatService.getReservedLength
      !== this.passengerLength && !this.elSeat.classList.contains('disabled')) {
      this.reserveSeatService.setReserved(`${this.k + 1}${this.seat}`);
      this.r.setStyle(this.el.nativeElement, 'background', 'orange');
      this.r.setStyle(this.el.nativeElement, 'color', '#ffffff');
    }
  }

  private resetReservedStyle() {
    if (!this.elSeat.classList.contains('disabled')) {
      this.reserveSeatService.deleteReserved(`${this.k + 1}${this.seat}`);
      this.r.setStyle(this.el.nativeElement, 'background', '');
      this.r.setStyle(this.el.nativeElement, 'color', '');
    }
  }
}
