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
  private defaultStepper = {
    flight: true,
    passengers: false,
    review: false,
  };

  private stepper = new BehaviorSubject<StepperState>(this.defaultStepper);

  public stepper$ = this.stepper.asObservable();

  public setStepper(newState: StepperState) {
    this.stepper.next(newState);
  }
}
