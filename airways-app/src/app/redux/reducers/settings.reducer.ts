import { createReducer, on } from '@ngrx/store';
import {
  getAirportError,
  getAirportSuccess,
  saveDateFormat,
  saveMoneyFormat,
} from '../actions/settings.action';
import { SettingsState } from '../models/redux-states';

export const SETTINGS_REDUCER_KEY = 'settings';

export const initialState: SettingsState = {
  format: {
    dateFormat: 'MM/DD/YYYY',
    moneyFormat: 'EUR',
  },
  airports: [],
};

export const settingsReducer = createReducer(
  initialState,
  on(saveDateFormat, (state, action):SettingsState => ({
    ...state,
    format: {
      ...state.format,
      dateFormat: action.dateFormat,
    },
  })),
  on(saveMoneyFormat, (state, action):SettingsState => ({
    ...state,
    format: {
      ...state.format,
      moneyFormat: action.moneyFormat,
    },
  })),
  on(getAirportSuccess, (state, action):SettingsState => ({
    ...state,
    airports: action.airports,
  })),
  on(getAirportError, (state):SettingsState => ({
    ...state,
    airports: [],
  })),
);
