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
}

interface Destination {
  flight: string;
  departDate: string;
  arriveDate: string;
}
