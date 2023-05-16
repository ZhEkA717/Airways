export interface PassengersForm {
  countryCode: string,
  phone: string,
  email: string
  passengers: PassengersInfo[],
}

export interface PassengersInfo {
  type: string,
  firstName: string,
  lastName: string,
  gender: string,
  baggage: Baggage,
  date: string,
  isCripple: boolean,
}

export interface Baggage {
  type: string,
  weight: number,
  size: string,
  text: string,
  price: number,
}
