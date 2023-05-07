import { Injectable } from '@angular/core';

const SEATS_ALL = 140;

@Injectable()
export default class SeatsCountService {
  public getColor(seatsFree: number, seats = SEATS_ALL) {
    const half = seats / 2;
    if (seatsFree > half) return '3px solid green';
    if (seatsFree < half) return '3px solid orange';
    if (seatsFree < 10) return '3px solid red';
    return '1px solid #CECECE';
  }
}
