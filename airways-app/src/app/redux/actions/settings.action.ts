import { createAction, props } from '@ngrx/store';
import { Airport } from '@shared/model/airport.model';

export enum SettingsAction {
  saveDateFormat = '[SETTINGS] save date format',
  saveMoneyFormat = '[SETTINGS] save money format',
  getAirportSuccess = '[Airports] get airports success',
  getAirportError = '[Airports] get airports error',
}

export const saveDateFormat = createAction(
  SettingsAction.saveDateFormat,
  props<{ dateFormat: string }>(),
);

export const saveMoneyFormat = createAction(
  SettingsAction.saveMoneyFormat,
  props<{ moneyFormat: string }>(),
);

export const getAirportSuccess = createAction(
  SettingsAction.getAirportSuccess,
  props<{
    airports: Airport[],
  }>(),
);

export const getAirportError = createAction(
  SettingsAction.getAirportError,
);
