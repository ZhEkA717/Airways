export interface FlightSearch {
  tripWay: string,
  from: string,
  destination: string,
  startDate: Date,
  endDate: Date,
  passengers: Passengers[],
}

export interface Passengers {
  id: number,
  view: string,
  description: string,
  value: number,
}
