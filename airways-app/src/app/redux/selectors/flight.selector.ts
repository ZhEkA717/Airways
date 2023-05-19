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
export const selectBookedBack = createSelector(
  selectBackTrip,
  (back: Trip) => back.bookedSeats,
);

export const selectBookedThere = createSelector(
  selectThereTrip,
  (there: Trip) => there.bookedSeats,
);

export const selectThereChoice = createSelector(
  selectFlight,
  (trip: TripState) => trip.thereSelect,
);

export const selectBackChoice = createSelector(
  selectFlight,
  (trip: TripState) => trip.backSelect,
);

export const selectThereSeats = createSelector(
  selectFlight,
  (trip: TripState) => trip.thereSeats,
);

export const selectBackSeats = createSelector(
  selectFlight,
  (trip: TripState) => trip.backSeats,
);
