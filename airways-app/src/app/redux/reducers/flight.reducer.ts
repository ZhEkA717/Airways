import { createReducer, on } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';
import {
  backSelect,
  resetFlight,
  saveBackTrip,
  saveThereTrip,
  thereSelect,
} from '../actions/flight.action';

export const TRIP_REDUCER_KEY = 'flight';

export interface TripState {
  thereSelect: boolean,
  backSelect: boolean,
  thereTrip: Trip,
  backTrip: Trip,
}

export const initialState: TripState = {
  thereSelect: true,
  backSelect: true,
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
  on(thereSelect, (state, action):TripState => ({
    ...state,
    thereSelect: action.there,
  })),
  on(backSelect, (state, action):TripState => ({
    ...state,
    backSelect: action.back,
  })),
  on(resetFlight, () => ({
    ...initialState,
  })),
);
