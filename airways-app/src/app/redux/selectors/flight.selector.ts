import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';
import { TRIP_REDUCER_KEY } from '../reducers/flight.reducer';
import { TripState } from '../models/redux-states';

export const selectFeatureFlight = createFeatureSelector<TripState>(TRIP_REDUCER_KEY);

export const selectThereTrip = createSelector(
  selectFeatureFlight,
  (trip: TripState) => trip.thereTrip,
);

export const selectBackTrip = createSelector(
  selectFeatureFlight,
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
  selectFeatureFlight,
  (trip: TripState) => trip.thereSelect,
);

export const selectBackChoice = createSelector(
  selectFeatureFlight,
  (trip: TripState) => trip.backSelect,
);

export const selectThereSeats = createSelector(
  selectFeatureFlight,
  (trip: TripState) => trip.thereSeats,
);

export const selectBackSeats = createSelector(
  selectFeatureFlight,
  (trip: TripState) => trip.backSeats,
);
