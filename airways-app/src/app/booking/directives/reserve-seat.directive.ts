import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import ReserveSeatService from '../services/reserve-seat.service';

@Directive({
  selector: '[appReserveSeat]',
})
export default class ReserveSeatDirective {
  @Input() passengerLength!: number;

  @Input() isRound!: boolean;

  @Input() elSeat!: HTMLElement;

  @Input() seat!: string;

  @Input() k!: number;

  public isReserved = false;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private store: Store,
    private reserveSeatService: ReserveSeatService,
  ) {}

  // ngOnInit(): void {
  //   const number = item?.slice(0, -1);
  //   const letter = item?.substring(item.length - 1);
  //   if (this.seat === letter
  //       && this.k + 1 === +number
  //       && this.reserveSeatService.getReservedLengthThere) {
  //     this.isReserved = true;
  //     this.setStyle();
  //   }
  // }

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
