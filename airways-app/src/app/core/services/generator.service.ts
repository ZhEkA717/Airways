import { Injectable } from '@angular/core';
import HttpApiService from './http-api.service';

@Injectable({
  providedIn: 'root',
})
export class GeneratorService {
  constructor(private httpApi: HttpApiService) {

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
}
