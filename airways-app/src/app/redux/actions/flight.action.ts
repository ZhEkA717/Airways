import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';
import { TripState } from '../models/redux-states';

export enum FlightAction {
  saveFlight = '[FLIGHT] save flight',
  saveThereTrip = '[FLIGHT] save there Trip',
  saveBackTrip = '[FLIGHT] save back Trip',
  thereSelect = '[FLIGHT] save there select',
  backSelect = '[FLIGHT] save back select',
  resetFlight = '[FLIGHT] reset flight state',
  thereSeats = '[FLIGHT] save there seats',
  backSeats = '[FLIGHT] save back seats',
  updateThereBooked = '[Flight] update there booked seats',
  updateThereBookedSeatsSuccess = '[Flight] update there booked seats success',
  updateThereBookedSeatsError = '[Flight] update there booked seats error',
  updateBookedBooked = '[Flight] update back booked seats',
  updateBackBookedSeatsSuccess = '[Flight] update back booked seats success',
  updateBackBookedSeatsError = '[Flight] update back booked seats error',
}

export const saveFlight = createAction(
  FlightAction.saveFlight,
  (flight: TripState) => flight,
);

export const saveThereTrip = createAction(
  FlightAction.saveThereTrip,
  (thereTrip: Trip) => thereTrip,
);

export const saveBackTrip = createAction(
  FlightAction.saveBackTrip,
  (backTrip: Trip) => backTrip,
);

export const thereSelect = createAction(
  FlightAction.thereSelect,
  props<{ there: boolean }>(),
);

export const backSelect = createAction(
  FlightAction.backSelect,
  props<{ back: boolean }>(),
);

export const thereSeats = createAction(
  FlightAction.thereSeats,
  props<{ thereSeats: string[] }>(),
);

export const backSeats = createAction(
  FlightAction.backSeats,
  props<{ backSeats: string[] }>(),
);

export const resetFlight = createAction(
  FlightAction.resetFlight,
);

export const updateThereBookedSeatsSuccess = createAction(
  FlightAction.updateThereBookedSeatsSuccess,
  props<{ bookedSeats: string[] }>(),
);

export const updateBackBookedSeatsSuccess = createAction(
  FlightAction.updateThereBookedSeatsSuccess,
  props<{ bookedSeats: string[] }>(),
);

export const updateBackBookedSeatsError = createAction(
  FlightAction.updateBackBookedSeatsError,
);

export const updateThereBookedSeatsError = createAction(
  FlightAction.updateThereBookedSeatsError,
);
