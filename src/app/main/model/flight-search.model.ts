export interface FlightSearch {
  tripWay: TripWay,
  from: string,
  destination: string,
  startDate: string,
  endDate: string,
  passengers: Passengers[],
}

export type TripWay = 'round' | 'one';

export interface Passengers {
  id: number,
  view: string,
  description: string,
  value: number,
}
