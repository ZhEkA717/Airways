import { createReducer, on } from '@ngrx/store';
import { FlightSearch, Passengers } from 'src/app/main/model/flight-search.model';
import { send } from '../actions/search.action';

export const SEARCH_REDUCER_KEY = 'search';

export interface SearchState {
  searchForm: FlightSearch,
}

export const initialState: SearchState = {
  searchForm: {
    tripWay: 'round',
    from: 'from',
    destination: 'destination',
    startDate: new Date().toString(),
    endDate: new Date().toString(),
    passengers: <Passengers[]>[],
  },
};

export const searchReducer = createReducer(
  initialState,
  on(send, (state, action):SearchState => ({
    ...state,
    searchForm: action,
  })),
);
