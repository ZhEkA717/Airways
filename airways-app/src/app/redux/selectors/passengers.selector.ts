import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import { PASSENGERS_REDUCER_KEY } from '../reducers/passengers.reducer';
import { PassengersState } from '../models/redux-states';

export const selectFeaturePassengerForm = createFeatureSelector<PassengersState>(
  PASSENGERS_REDUCER_KEY,
);

export const selectPassengerForm = createSelector(
  selectFeaturePassengerForm,
  (state: PassengersState) => state.passengersForm,
);

export const selectPassengers = createSelector(
  selectPassengerForm,
  (form: PassengersForm) => form.passengers,
);
