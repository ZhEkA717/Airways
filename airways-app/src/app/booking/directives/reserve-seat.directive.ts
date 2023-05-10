import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import ReserveSeatService from '../services/reserve-seat.service';

@Directive({
  selector: '[appReserveSeat]',
})
export default class ReserveSeatDirective {
  @Input() passengerLength!: number;

  @Input() seat!: string;

  @Input() k!: number;

  public isReserved = false;

  constructor(
    private el: ElementRef,
    private r: Renderer2,
    private reserveSeatService: ReserveSeatService,
  ) {}

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
      !== this.passengerLength) {
      this.reserveSeatService.setReserved(`${this.k + 1}${this.seat}`);
      this.r.setStyle(this.el.nativeElement, 'background', '#9d3f3f');
      this.r.setStyle(this.el.nativeElement, 'color', '#ffffff');
    }
  }

  private resetReservedStyle() {
    this.reserveSeatService.deleteReserved(`${this.k + 1}${this.seat}`);
    this.r.setStyle(this.el.nativeElement, 'background', '');
    this.r.setStyle(this.el.nativeElement, 'color', '');
  }
}
