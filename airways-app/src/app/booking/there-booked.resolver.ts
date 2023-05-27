import { Injectable } from '@angular/core';
import {
  Router, Resolve,
} from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Store } from '@ngrx/store';
import HttpApiService from '../core/services/http-api.service';
import { selectThereTrip } from '../redux/selectors/flight.selector';
import { Trip } from '../shared/model/trip.model';

@Injectable({
  providedIn: 'root',
})
export class ThereBookedResolver implements Resolve<string[]> {
  private thereTrip$ = this.store.select(selectThereTrip);

  private theretrip!: Trip;

  constructor(
    private store: Store,
    private httpApiService: HttpApiService,
    private router: Router,
  ) {
    this.thereTrip$.subscribe((thereTrip) => {
      this.theretrip = thereTrip;
    });
  }

  resolve(): Observable<string[]> {
    return this.httpApiService.getBookedSeats(this.theretrip.id)
      .pipe(
        catchError(() => {
          this.router.navigate(['flight']);
          return EMPTY;
        }),
      );
  }
}
