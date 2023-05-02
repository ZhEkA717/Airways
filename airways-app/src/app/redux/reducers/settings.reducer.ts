import { createReducer, on } from '@ngrx/store';
import { Airport } from 'src/app/shared/model/airport.model';
import {
  getAirportError,
  getAirportSuccess,
  saveDateFormat,
  saveMoneyFormat,
} from '../actions/settings.action';

export const SETTINGS_REDUCER_KEY = 'settings';

export interface SettingsState {
  format: {
    dateFormat: string,
    moneyFormat: string,
  },
  airports: Airport[],
}

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
