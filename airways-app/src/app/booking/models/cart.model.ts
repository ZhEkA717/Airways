import { TripWay } from 'src/app/main/model/flight-search.model';

export interface CartItem {
  flightNo: string,
  flight: string | string[],
  type: TripWay,
  date: TripDateThere | [TripDateThere, TripDateBack],
  passengers: string[],
  price: number
}

interface TripDateThere {
  thereDepartDate: string,
  thereArriveDate: string,
}

interface TripDateBack {
  backDepartDate: string,
  backArriveDate: string,
}
