import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';

export enum FlightAction {
  saveThereTrip = '[FLIGHT] save there Trip',
  saveBackTrip = '[FLIGHT] save back Trip',
  thereSelect = '[FLIGHT] save there select',
  backSelect = '[FLIGHT] save back select',
  resetFlight = '[FLIGHT] reset flight state',
  thereSeats = '[FLIGHT] save there seats',
  backSeats = '[FLIGHT] save back seats',
}

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
