import { PassengersState, SearchState, TripState } from '@redux/models/redux-states';

export interface CartItem {
  id: number;
  flightNo: string;
  forward: Destination;
  backward: Destination;
  type: 'Round trip' | 'One way';
  passengers: string[];
  price: number;
  thereSeats: string[];
  backSeats: string[];
  isPayed: boolean;
  search: SearchState,
  passengersForm: PassengersState,
  flight: TripState,
}

interface Destination {
  flight: string;
  departDate: string;
  arriveDate: string;
}
