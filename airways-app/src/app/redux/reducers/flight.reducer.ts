import { createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';
import { saveBackTrip, saveThereTrip } from '../actions/flight.action';

export const TRIP_REDUCER_KEY = 'flight';

export interface TripState {
  thereTrip: Trip,
  backTrip: Trip,
}

export const initialState: TripState = {
  thereTrip: <Trip>{},
  backTrip: <Trip>{},
};

export const flightReducer = createReducer(
  initialState,
  on(saveThereTrip, (state, action):TripState => ({
    ...state,
    thereTrip: action,
  })),
  on(saveBackTrip, (state, action):TripState => ({
    ...state,
    backTrip: action,
  })),
);
