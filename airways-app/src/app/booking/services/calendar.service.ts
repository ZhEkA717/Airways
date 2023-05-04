import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from 'src/app/shared/model/trip.model';

@Injectable()
export default class CalendarService {
  private arriveDates = new BehaviorSubject<Trip[]>([]);

  public arriveDates$ = this.arriveDates.asObservable();

  public setArriveDates(newValue: Trip[]) {
    this.arriveDates.next(newValue);
  }

  public defaultTrip:Trip = {
    arriveDate: '',
    departDate: '',
    flightNo: '',
    flightTime: '',
    id: '',
    from: '',
    to: '',
    price: 0,
    seats: 0,
    day: '',
  };

  private trip = new BehaviorSubject<Trip>(this.defaultTrip);

  public trip$ = this.trip.asObservable();

  public setTrip(newValue: Trip) {
    this.trip.next(newValue);
  }

  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  private days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  public dayOfWeek(
    day: string | undefined,
    month: number,
    year: string,
  ) {
    return this.days[new Date(`${day}${this.months[month]}${year}`).getDay()];
  }

  public getDate(
    day: string | undefined,
    month: number,
    year: string,
  ) {
    return new Date(new Date(`${day}${this.months[month]}${year}`));
  }
}
