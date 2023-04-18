import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SETTINGS_REDUCER_KEY, SettingsState } from '../reducers/settings.reducer';

export const selectFeatureSettings = createFeatureSelector<SettingsState>(SETTINGS_REDUCER_KEY);

export const selectDateFormat = createSelector(
  selectFeatureSettings,
  (settings: SettingsState) => settings.format.dateFormat,
);
export const selectMoneyFormat = createSelector(
  selectFeatureSettings,
  (settings: SettingsState) => settings.format.moneyFormat,
);
