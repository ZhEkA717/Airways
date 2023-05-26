import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPassengers } from '@redux/selectors/passengers.selector';
import { Trip } from '@shared/model/trip.model';

@Component({
  selector: 'app-summary-trip',
  templateUrl: './summary-trip.component.html',
  styleUrls: ['./summary-trip.component.scss'],
})
export default class SummaryTripComponent {
  @Input() isRound!: boolean;

  @Input() thereTrip!: Trip;

  @Input() backTrip!: Trip;

  @Input() thereSeats!: string[];

  @Input() backSeats!: string[];

  public passengers$ = this.store.select(selectPassengers);

  constructor(
    private store: Store,
  ) {}
}
