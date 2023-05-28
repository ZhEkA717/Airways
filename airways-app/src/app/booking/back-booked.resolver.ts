import { Injectable } from '@angular/core';
import {
  Router, Resolve,
} from '@angular/router';
import {
  EMPTY,
  Observable,
  catchError,
  of,
} from 'rxjs';
import { Store } from '@ngrx/store';
import HttpApiService from '../core/services/http-api.service';
import { selectBackTrip } from '../redux/selectors/flight.selector';
import { Trip } from '../shared/model/trip.model';
import { selectTripWay } from '../redux/selectors/search.selector';
import { TripWay } from '../main/model/flight-search.model';

@Injectable({
  providedIn: 'root',
})
export class BackBookedResolver implements Resolve<string[]> {
  private tripWay$ = this.store.select(selectTripWay);

  private tripWay!: TripWay;

  private backTrip$ = this.store.select(selectBackTrip);

  private backTrip!: Trip;

  constructor(
    private store: Store,
    private httpApiService: HttpApiService,
    private router: Router,
  ) {
    this.tripWay$.subscribe((way) => {
      this.tripWay = way;
    });

    this.backTrip$.subscribe((thereTrip) => {
      this.backTrip = thereTrip;
    });
  }

  resolve(): Observable<string[]> {
    return this.tripWay === 'round'
      ? this.httpApiService.getBookedSeats(this.backTrip.id)
        .pipe(
          catchError(() => {
            this.router.navigate(['flight']);
            return EMPTY;
          }),
        )
      : of([]);
  }
}
