import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { SEARCH_REDUCER_KEY, searchReducer } from './reducers/search.reducer';
import { State } from './state.model';
import { SETTINGS_REDUCER_KEY, settingsReducer } from './reducers/settings.reducer';
import { hydrationMetaReducer } from './reducers/hydration.reducer';
import { PASSENGERS_REDUCER_KEY, passengersReducer } from './reducers/passengers.reducer';

export const reducers: ActionReducerMap<State> = {
  [SEARCH_REDUCER_KEY]: searchReducer,
  [SETTINGS_REDUCER_KEY]: settingsReducer,
  [PASSENGERS_REDUCER_KEY]: passengersReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode()
  ? [hydrationMetaReducer]
  : [hydrationMetaReducer];
