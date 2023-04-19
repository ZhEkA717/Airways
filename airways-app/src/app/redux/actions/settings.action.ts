import { createAction, props } from '@ngrx/store';

export enum SettingsAction {
  saveDateFormat = '[SETTINGS] save date format',
  saveMoneyFormat = '[SETTINGS] save money format',
}

export const saveDateFormat = createAction(
  SettingsAction.saveDateFormat,
  props<{ dateFormat: string }>(),
);

export const saveMoneyFormat = createAction(
  SettingsAction.saveMoneyFormat,
  props<{ moneyFormat: string }>(),
);
