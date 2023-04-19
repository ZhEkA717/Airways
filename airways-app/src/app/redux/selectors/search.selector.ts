import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SEARCH_REDUCER_KEY, SearchState } from '../reducers/search.reducer';

export const selectFeatureSearch = createFeatureSelector<SearchState>(SEARCH_REDUCER_KEY);

export const selectSearch = createSelector(
  selectFeatureSearch,
  (search: SearchState) => search.searchForm,
);
