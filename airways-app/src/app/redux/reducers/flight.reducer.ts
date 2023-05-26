import { createReducer, on } from '@ngrx/store';
import { Trip } from '@shared/model/trip.model';
import {
  backSeats,
  backSelect,
  resetFlight,
  saveBackTrip,
  saveFlight,
  saveThereTrip,
  thereSeats,
  thereSelect,
} from '../actions/flight.action';
import { TripState } from '../models/redux-states';

export const TRIP_REDUCER_KEY = 'flight';

export const initialState: TripState = {
  thereSelect: true,
  backSelect: true,
  thereSeats: [],
  backSeats: [],
  thereTrip: <Trip>{},
  backTrip: <Trip>{},
};

export const flightReducer = createReducer(
  initialState,
  on(saveFlight, (state, action):TripState => ({
    ...action,
  })),
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
  on(thereSeats, (state, action):TripState => ({
    ...state,
    thereSeats: action.thereSeats,
  })),
  on(backSeats, (state, action):TripState => ({
    ...state,
    backSeats: action.backSeats,
  })),
  on(resetFlight, () => ({
    ...initialState,
  })),
);
