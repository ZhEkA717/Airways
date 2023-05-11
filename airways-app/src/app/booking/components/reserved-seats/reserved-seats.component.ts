import { Component, Input, OnInit } from '@angular/core';
import ReserveSeatService from '../../services/reserve-seat.service';

const SEATS_ALL = 144;

@Component({
  selector: 'app-reserved-seats',
  templateUrl: './reserved-seats.component.html',
  styleUrls: ['./reserved-seats.component.scss'],
})
export default class ReservedSeatsComponent implements OnInit {
  @Input() passengerLength!: number;

  private seatNumber = 6;

  private columnSeats = SEATS_ALL / this.seatNumber;

  public seatsNumbers = ['A', 'B', 'C', 'D', 'E', 'F'];

  public arraySeats: string[][] = [];

  constructor(private reserveSeatService: ReserveSeatService) {}

  private get getArraySeats() {
    const arr: string[][] = [];
    this.seatsNumbers.forEach((item) => {
      const arrInArr = [];
      for (let i = 0; i < this.columnSeats; i += 1) {
        arrInArr.push(item);
      }
      arr.push(arrInArr);
    });

    return arr;
  }

  ngOnInit(): void {
    this.arraySeats = this.getArraySeats;
  }
}
