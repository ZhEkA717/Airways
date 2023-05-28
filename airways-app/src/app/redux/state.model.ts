import {
  CartState,
  PassengersState,
  SearchState,
  SettingsState,
  TripState,
} from './models/redux-states';
import { CART_REDUCER_KEY } from './reducers/cart.reducer';
import { TRIP_REDUCER_KEY } from './reducers/flight.reducer';
import { PASSENGERS_REDUCER_KEY } from './reducers/passengers.reducer';
import { SEARCH_REDUCER_KEY } from './reducers/search.reducer';
import { SETTINGS_REDUCER_KEY } from './reducers/settings.reducer';

export interface State {
  [SEARCH_REDUCER_KEY]: SearchState,
  [SETTINGS_REDUCER_KEY]: SettingsState,
  [PASSENGERS_REDUCER_KEY]: PassengersState,
  [TRIP_REDUCER_KEY]: TripState,
  [CART_REDUCER_KEY]: CartState,
}
