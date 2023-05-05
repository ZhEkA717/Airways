export interface Trip {
  id: string;
  flightNo: string;
  from: { code: string; city: string; };
  to: { code: string; city: string; };
  departDate: string;
  flightTime: string;
  arrivDate: string;
  seats: number;
  price: number;
}
