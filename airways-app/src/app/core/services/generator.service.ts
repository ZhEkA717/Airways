import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import HttpApiService from './http-api.service';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  constructor(private httpApi: HttpApiService) {
    // console.log(this.addDays('05.01.2023 9:10:00', 24));
    // for (let i = 0; i < 156; i++) {
    //   this.updateTripDates(i + 1, 24);
    // }
  }

  generateSomeSeats(n: number) {
    const MAX_SEATS = 24;
    const SEAT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
    const random = (max: number) => Math.floor(Math.random() * max);
    const seats: string[] = [];
    for (let i = 0; i < n; i++) {
      let randomSeat = '';
      do {
        randomSeat = `${random(MAX_SEATS) + 1}${SEAT_LETTERS[random(SEAT_LETTERS.length)]}`;
      } while (seats.includes(randomSeat));
      seats.push(randomSeat);
    }
    return seats.sort();
  }

  generateSeatsForBackend(maxTripId: number) {
    for (let id = 1; id <= maxTripId; id++) {
      const seats = this.generateSomeSeats(Math.floor(Math.random() * 140));
      this.httpApi.setBookedSeats(id, seats).subscribe();
    }
  }

  async updateTripDates(tripId: number, days: number) {
    const trip = await firstValueFrom(this.httpApi.getTripById(tripId));
    const arriveDate = this.addDays(trip.arriveDate, days);
    const departDate = this.addDays(trip.departDate, days);
    this.httpApi.updateDates(tripId, departDate, arriveDate).subscribe();
  }

  addDays(date: string, days: number): string {
    const ticks = Date.parse(date) + days * 1000 * 60 * 60 * 24;
    const newDate = new Date(ticks);
    return this.convertDateToUS(newDate.toLocaleString('ru'));
  }

  convertDateToUS(date: string) {
    const strArr = date.split('');
    [strArr[0], strArr[1], strArr[3], strArr[4], strArr[10]] = [strArr[3], strArr[4], strArr[0], strArr[1], ''];
    return strArr.join('');
  }
}
