import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';
import { TRIP_REDUCER_KEY, TripState } from '../reducers/flight.reducer';

export const selectFlight = createFeatureSelector<TripState>(TRIP_REDUCER_KEY);

export const selectThereTrip = createSelector(
  selectFlight,
  (trip: TripState) => trip.thereTrip,
);

export const selectBackTrip = createSelector(
  selectFlight,
  (trip: TripState) => trip.backTrip,
);

export const selectBackPrice = createSelector(
  selectBackTrip,
  (back: Trip) => back.price,
);

export const selectTherePrice = createSelector(
  selectThereTrip,
  (there: Trip) => there.price,
);
