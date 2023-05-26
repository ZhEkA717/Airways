import { createReducer, on } from '@ngrx/store';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import {
  send,
} from '../actions/passengers.action';
import { PassengersState } from '../models/redux-states';

export const PASSENGERS_REDUCER_KEY = 'passengers-form';

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
