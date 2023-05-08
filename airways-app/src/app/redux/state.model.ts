import { CART_REDUCER_KEY, CartState } from './reducers/cart.reducer';
import { TRIP_REDUCER_KEY, TripState } from './reducers/flight.reducer';
import { PASSENGERS_REDUCER_KEY, PassengersState } from './reducers/passengers.reducer';
import { SEARCH_REDUCER_KEY, SearchState } from './reducers/search.reducer';
import { SETTINGS_REDUCER_KEY, SettingsState } from './reducers/settings.reducer';

export interface State {
  [SEARCH_REDUCER_KEY]: SearchState,
  [SETTINGS_REDUCER_KEY]: SettingsState,
  [PASSENGERS_REDUCER_KEY]: PassengersState,
  [TRIP_REDUCER_KEY]: TripState,
  [CART_REDUCER_KEY]: CartState,
}
