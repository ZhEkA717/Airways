import { PassengersForm } from '@booking/models/passengers.model';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { Airport } from '@shared/model/airport.model';
import { CartItem } from '@shared/model/cart.model';
import { Trip } from '@shared/model/trip.model';

export interface TripState {
  thereSelect: boolean,
  backSelect: boolean,
  thereSeats: string[],
  backSeats: string[],
  thereTrip: Trip,
  backTrip: Trip,
}

export interface CartState {
  items: CartItem[],
}

export interface PassengersState {
  passengersForm: PassengersForm,
}

export interface SearchState {
  searchForm: FlightSearch,
}

export interface SettingsState {
  format: {
    dateFormat: string,
    moneyFormat: string,
  },
  airports: Airport[],
}
