import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import { PASSENGERS_REDUCER_KEY, PassengersState } from '../reducers/passengers.reducer';

export const passengerFeatureSearch = createFeatureSelector<PassengersState>(
  PASSENGERS_REDUCER_KEY,
);

export const selectPassengerForm = createSelector(
  passengerFeatureSearch,
  (state: PassengersState) => state.passengersForm,
);

export const selectPassengers = createSelector(
  selectPassengerForm,
  (form: PassengersForm) => form.passengers,
);
