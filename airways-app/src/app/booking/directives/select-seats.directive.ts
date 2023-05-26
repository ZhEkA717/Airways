import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectBackTrip, selectThereTrip } from '@redux/selectors/flight.selector';
import { Trip } from '@shared/model/trip.model';
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
    this.store.select(selectBackTrip).subscribe((trip) => {
      if (this.isRound) this.setStyleTrip(trip);
    });
    this.store.select(selectThereTrip).subscribe((trip) => {
      if (!this.isRound) this.setStyleTrip(trip);
    });
  }

  private setStyleTrip(trip: Trip) {
    this.r.setStyle(
      this.el.nativeElement,
      'borderBottom',
      `${this.seatsCountService.getColor(trip.seats)}`,
    );
  }
}
