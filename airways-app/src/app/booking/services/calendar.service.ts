import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from 'src/app/shared/model/trip.model';

@Injectable()
export default class CalendarService {
  private departDatesThere = new BehaviorSubject<Trip[]>([]);

  public departDatesThere$ = this.departDatesThere.asObservable();

  public setDepartDatesThere(newValue: Trip[]) {
    this.departDatesThere.next(newValue);
  }

  private departDatesBack = new BehaviorSubject<Trip[]>([]);

  public departDatesBack$ = this.departDatesBack.asObservable();

  public setDepartDatesBack(newValue: Trip[]) {
    this.departDatesBack.next(newValue);
  }

  private isBackSelect = new BehaviorSubject<boolean>(true);

  public isBackSelect$ = this.isBackSelect.asObservable();

  public setBackSelect(newValue: boolean) {
    this.isBackSelect.next(newValue);
  }

  private isThereSelect = new BehaviorSubject<boolean>(true);

  public isThereSelect$ = this.isThereSelect.asObservable();

  public setThereSelect(newValue: boolean) {
    this.isThereSelect.next(newValue);
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

  public week(date: Date) {
    const dayOfMonth = date.getDate();
    const day = date.getDay();

    return Math.abs(Math.ceil((dayOfMonth - 1 - day) / 7));
  }
}
