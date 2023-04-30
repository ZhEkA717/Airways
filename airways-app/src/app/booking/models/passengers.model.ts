export interface PassengersForm {
  countryCode: string,
  phone: string,
  email: string
  passengers: PassengersInfo[]
}

export interface PassengersInfo {
  type: string,
  firstName: string,
  lastName: string,
  gender: string,
  baggage: string,
  date: string,
  isCripple: boolean,
}
