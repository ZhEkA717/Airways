import { Injectable } from '@angular/core';

// TODO: Need to move to external model files
export type FlightType = 'One way' | 'Round trip';
// TODO: temporary flight replace
export interface Flight {
  id: number,
  flightNo: string;
  forward: { flight: string; datetime: string };
  backward: { flight: string; datetime: string };
  type: FlightType;
  passengers: string[];
  price: string
}

// TODO: Delete after implements
const MOCK_DATA: Flight[] = [
  {
    id: 1, flightNo: 'BS1416', forward: { flight: 'Berlin - Bruxselles', datetime: '13.05.2023 14:50:00 - 21:00:00' }, backward: { flight: 'Bruxselles - Berlin', datetime: '14.05.2023 8:00:00 - 14:10:00' }, type: 'Round trip', passengers: ['1 x Adult', '1 x Child', '1 x Infant'], price: '$551.38',
  },
  {
    id: 2, flightNo: 'BT948', forward: { flight: 'Berlin - Barselona', datetime: '16.05.2023 8:00:00 - 12:10:00' }, backward: { flight: '', datetime: '' }, type: 'One way', passengers: ['1 x Adult', '', ''], price: '$20.96',
  },
  {
    id: 3, flightNo: 'CP1661', forward: { flight: 'Barselona - Tel Aviv', datetime: '18.05.2023 17:40:00 - 22:40:00' }, backward: { flight: '', datetime: '' }, type: 'One way', passengers: ['1 x Adult', '1 x Child', ''], price: '$192.15',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public table: Flight[] = [];

  constructor() {
    this.table = MOCK_DATA;
  }

  getTotalPrice() {
    return 764.49;
  }
}
