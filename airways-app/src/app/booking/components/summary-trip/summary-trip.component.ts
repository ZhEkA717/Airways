import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPassengers } from 'src/app/redux/selectors/passengers.selector';

@Component({
  selector: 'app-summary-trip',
  templateUrl: './summary-trip.component.html',
  styleUrls: ['./summary-trip.component.scss'],
})
export default class SummaryTripComponent {
  public passengers$ = this.store.select(selectPassengers);

  constructor(
    private store: Store,
  ) {}
}
