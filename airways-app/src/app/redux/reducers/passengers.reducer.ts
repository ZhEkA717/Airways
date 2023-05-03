import { createReducer, on } from '@ngrx/store';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import {
  send,
} from '../actions/passengers.action';

export const PASSENGERS_REDUCER_KEY = 'passengers-form';

export interface PassengersState {
  passengersForm: PassengersForm,
}

export const initialState: PassengersState = {
  passengersForm: <PassengersForm>{},
};

export const passengersReducer = createReducer(
  initialState,
  on(send, (state, action):PassengersState => ({
    ...state,
    passengersForm: action,
  })),
);
