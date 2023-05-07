import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PASSENGERS_REDUCER_KEY, PassengersState } from '../reducers/passengers.reducer';

export const passengerFeatureSearch = createFeatureSelector<PassengersState>(
  PASSENGERS_REDUCER_KEY,
);

export const selectPassengerForm = createSelector(
  passengerFeatureSearch,
  (form: PassengersState) => form.passengersForm,
);

export const selectPassengers = createSelector(
  passengerFeatureSearch,
  (form: PassengersState) => form.passengersForm.passengers,
);
