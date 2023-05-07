export interface Trip {
  id: string;
  flightNo: string;
  from: string;
  to: string;
  departDate: string;
  flightTime: string;
  arriveDate: string;
  seats: number;
  price: number;
  day?: string;
}
