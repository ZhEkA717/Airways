import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SEARCH_REDUCER_KEY } from '../reducers/search.reducer';
import { SearchState } from '../models/redux-states';

export const selectFeatureSearch = createFeatureSelector<SearchState>(SEARCH_REDUCER_KEY);

export const selectSearch = createSelector(
  selectFeatureSearch,
  (search: SearchState) => search.searchForm,
);

export const selectTripWay = createSelector(
  selectFeatureSearch,
  (search: SearchState) => search.searchForm.tripWay,
);
