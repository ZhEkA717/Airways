import { createAction } from '@ngrx/store';
import { FlightSearch } from 'src/app/main/model/flight-search.model';

export enum SearchAction {
  send = '[SEARCH] send form',
}

export const send = createAction(
  SearchAction.send,
  (search: FlightSearch) => search,
);
