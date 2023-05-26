import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAirports } from '@redux/selectors/settings.selector';
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

  public filter(value: string): Airport[] {
    const filterValue = value.toLowerCase();

    return this.airport
      .filter((option) => `${option.city.toLowerCase()} ${option.code.toLowerCase()}`
        .includes(filterValue));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
