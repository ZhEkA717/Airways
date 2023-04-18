import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { SEARCH_REDUCER_KEY, searchReducer } from './reducers/search.reducer';
import { State } from './state.model';

export const reducers: ActionReducerMap<State> = {
  [SEARCH_REDUCER_KEY]: searchReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
