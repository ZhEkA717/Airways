import { Component, Input, OnInit } from '@angular/core';
import { SEATS_ALL } from '../../services/seats-count.service';

@Component({
  selector: 'app-reserved-seats',
  templateUrl: './reserved-seats.component.html',
  styleUrls: ['./reserved-seats.component.scss'],
})
export default class ReservedSeatsComponent implements OnInit {
  @Input() passengerLength!: number;

  @Input() isRound!: boolean;

  private seatNumber = 6;

  private columnSeats = SEATS_ALL / this.seatNumber;

  public seatsNumbers = ['A', 'B', 'C', 'D', 'E', 'F'];

  public arraySeats: string[][] = [];

  public reservedThere = ['1A', '1B', '1C', '2E', '2F', '12C', '14D', '18F']; // mock data

  public reservedBack = ['1A', '15E', '15F', '14C', '14D', '20F', '20E']; // mock data

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
