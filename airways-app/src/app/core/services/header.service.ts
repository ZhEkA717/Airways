import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface StepperState {
  flight: boolean,
  passengers: boolean,
  review: boolean,
}

@Injectable({
  providedIn: 'root',
})
export default class HeaderService {
  private defaultIsBooking = true;

  private defaultStepper = {
    flight: true,
    passengers: false,
    review: false,
  };

  private isBooking = new BehaviorSubject<boolean>(this.defaultIsBooking);

  private stepper = new BehaviorSubject<StepperState>(this.defaultStepper);

  public isBooking$ = this.isBooking.asObservable();

  public stepper$ = this.stepper.asObservable();

  public setIsBooking(newState: boolean) {
    this.isBooking.next(newState);
  }

  public setStepper(newState: StepperState) {
    this.stepper.next(newState);
  }
}
