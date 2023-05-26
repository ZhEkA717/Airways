import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SETTINGS_REDUCER_KEY } from '../reducers/settings.reducer';
import { SettingsState } from '../models/redux-states';

export const selectFeatureSettings = createFeatureSelector<SettingsState>(SETTINGS_REDUCER_KEY);

export const selectDateFormat = createSelector(
  selectFeatureSettings,
  (settings: SettingsState) => settings.format.dateFormat,
);
export const selectMoneyFormat = createSelector(
  selectFeatureSettings,
  (settings: SettingsState) => settings.format.moneyFormat,
);
export const selectAirports = createSelector(
  selectFeatureSettings,
  (settings: SettingsState) => settings.airports,
);
