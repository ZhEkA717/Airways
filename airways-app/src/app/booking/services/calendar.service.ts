import { Injectable } from '@angular/core';

@Injectable()
export default class CalendarService {
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

  public dayOfWeek(day: number, month: string, year: string) {
    return this.days[new Date(`${day}${month}${year}`).getDay()];
  }

  public getDate(
    day: number,
    month: string,
    year = new Date().getFullYear().toString(),
  ) {
    return new Date(new Date(`${day}${month}${year}`));
  }
}
