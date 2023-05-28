export interface Trip {
  id: string;
  flightNo: string;
  from: { code: string; city: string; };
  to: { code: string; city: string; };
  departDate: string;
  flightTime: string;
  arriveDate: string;
  seats: number;
  bookedSeats: string[];
  price: number;
  day?: string;
}
