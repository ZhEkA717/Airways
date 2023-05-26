import { createAction } from '@ngrx/store';
import { PassengersForm } from '@booking/models/passengers.model';

export enum PassengersAction {
  sendForm = '[PASSENGERS] send form',
}

export const send = createAction(
  PassengersAction.sendForm,
  (passengersForm: PassengersForm) => passengersForm,
);
