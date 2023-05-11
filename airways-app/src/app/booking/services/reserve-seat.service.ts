import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export default class ReserveSeatService {
  private reserve = new BehaviorSubject<string[]>([]);

  public reservedSeats$ = this.reserve.asObservable();

  private reservedSeats: string[] = [];

  public setReserved(seat: string) {
    this.reservedSeats.push(seat);
    this.reserve.next(this.reservedSeats);
  }

  public deleteReserved(seat: string) {
    this.reservedSeats = this.reservedSeats
      .filter((item) => item !== seat);
    this.reserve.next(this.reservedSeats);
  }

  public resetReservedSeats() {
    this.reservedSeats = [];
    this.reserve.next(this.reservedSeats);
  }

  public get getReservedSeats() {
    return this.reservedSeats;
  }

  public get getReservedLength() {
    return this.reservedSeats.length;
  }
}
