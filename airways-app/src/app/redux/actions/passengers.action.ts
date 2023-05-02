import { createAction } from '@ngrx/store';
import { PassengersForm } from 'src/app/booking/models/passengers.model';

export enum PassengersAction {
  sendForm = '[PASSENGERS] send form',
  getAirportSuccess = '[Airports] get airports success',
  getAirportError = '[Airports] get airports error',
}

export const send = createAction(
  PassengersAction.sendForm,
  (passengersForm: PassengersForm) => passengersForm,
);
