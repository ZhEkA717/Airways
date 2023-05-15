export interface CartItem {
  id: number;
  flightNo: string;
  forward: { flight: string, datetime: string };
  backward: { flight: string, datetime: string };
  type: 'Round trip' | 'One way';
  passengers: string[];
  price: number;
}
