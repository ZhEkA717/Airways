import { createAction } from '@ngrx/store';
import { FlightSearch } from 'src/app/main/model/flight-search.model';

export enum SearchAction {
  sendForm = '[SEARCH] send form',
}

export const send = createAction(
  SearchAction.sendForm,
  (searchForm: FlightSearch) => searchForm,
);
