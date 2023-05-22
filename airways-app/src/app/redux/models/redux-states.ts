import { PassengersForm } from 'src/app/booking/models/passengers.model';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { Airport } from 'src/app/shared/model/airport.model';
import { CartItem } from 'src/app/shared/model/cart.model';
import { Trip } from 'src/app/shared/model/trip.model';

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
