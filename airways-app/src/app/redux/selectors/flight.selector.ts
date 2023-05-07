import { createFeatureSelector, createSelector } from '@ngrx/store';
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
