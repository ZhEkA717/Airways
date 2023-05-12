import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class ReserveSeatService {
  // there

  private reservedSeatsThere = new BehaviorSubject<string[]>([]);

  public reservedSeatsThere$ = this.reservedSeatsThere.asObservable();

  public setReservedThere(seat: string) {
    this.reservedSeatsThere.next([...this.reservedSeatsThere.getValue(), seat]);
  }

  public deleteReservedThere(seat: string) {
    this.reservedSeatsThere.next(this.reservedSeatsThere.getValue()
      .filter((item) => item !== seat));
  }

  public resetReservedSeatsThere() {
    this.reservedSeatsThere.next([]);
  }

  public get getReservedSeatsThere() {
    return this.reservedSeatsThere.getValue();
  }

  public get getReservedLengthThere() {
    return this.reservedSeatsThere.getValue().length;
  }

  // back

  private reservedSeatsBack = new BehaviorSubject<string[]>([]);

  public reservedSeatsBack$ = this.reservedSeatsBack.asObservable();

  public setReservedBack(seat: string) {
    this.reservedSeatsBack.next([...this.reservedSeatsBack.getValue(), seat]);
  }

  public deleteReservedBack(seat: string) {
    this.reservedSeatsBack.next(this.reservedSeatsBack.getValue()
      .filter((item) => item !== seat));
  }

  public resetReservedSeatsBack() {
    this.reservedSeatsBack.next([]);
  }

  public get getReservedSeatsBack() {
    return this.reservedSeatsBack.getValue();
  }

  public get getReservedLengthBack() {
    return this.reservedSeatsBack.getValue().length;
  }
}
