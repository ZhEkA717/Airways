import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBackTrip, selectThereTrip } from 'src/app/redux/selectors/flight.selector';
import SeatsCountService from '../services/seats-count.service';

@Directive({
  selector: '[appSelectSeats]',
})
export default class SelectSeatsDirective implements OnInit {
  @Input() seats!: number;

  @Input() isRound!: boolean;

  constructor(
    private r: Renderer2,
    private el: ElementRef,
    private seatsCountService: SeatsCountService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.select(selectBackTrip).subscribe((back) => {
      if (this.isRound) {
        this.r.setStyle(
          this.el.nativeElement,
          'borderBottom',
          `${this.seatsCountService.getColor(back.seats)}`,
        );
      }
    });
    this.store.select(selectThereTrip).subscribe((there) => {
      if (!this.isRound) {
        this.r.setStyle(
          this.el.nativeElement,
          'borderBottom',
          `${this.seatsCountService.getColor(there.seats)}`,
        );
      }
    });
  }
}
