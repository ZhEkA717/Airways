import { createReducer, on } from '@ngrx/store';
import { saveDateFormat, saveMoneyFormat } from '../actions/settings.action';

export const SETTINGS_REDUCER_KEY = 'settings';

export interface SettingsState {
  format: {
    dateFormat: string,
    moneyFormat: string,
  }
}

export const initialState: SettingsState = {
  format: {
    dateFormat: 'MM/DD/YYYY',
    moneyFormat: 'EUR',
  },
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
);
