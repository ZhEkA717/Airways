import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAirports } from 'src/app/redux/selectors/settings.selector';
import { Subscription } from 'rxjs';
import { Airport } from '../model/airport.model';

@Injectable({
  providedIn: 'root',
})
export default class AirportsService implements OnDestroy {
  private airports$ = this.store.select(selectAirports);

  public airport: Airport[] = [];

  private sub!: Subscription;

  constructor(private store: Store) {
    this.sub = this.airports$.subscribe((res) => {
      this.airport = res;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
