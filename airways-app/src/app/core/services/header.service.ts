import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class HeaderService {
  private defaultIsBooking = true;

  private isBooking = new BehaviorSubject<boolean>(this.defaultIsBooking);

  public isBooking$ = this.isBooking.asObservable();

  public setIsBooking(newState: boolean) {
    this.isBooking.next(newState);
  }
}
