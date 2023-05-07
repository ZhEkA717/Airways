import { createAction } from '@ngrx/store';
import { Trip } from 'src/app/shared/model/trip.model';

export enum FlightAction {
  saveThereTrip = '[FLIGHT] save there Trip',
  saveBackTrip = '[FLIGHT] save back Trip',
}

export const saveThereTrip = createAction(
  FlightAction.saveThereTrip,
  (thereTrip: Trip) => thereTrip,
);

export const saveBackTrip = createAction(
  FlightAction.saveBackTrip,
  (backTrip: Trip) => backTrip,
);
