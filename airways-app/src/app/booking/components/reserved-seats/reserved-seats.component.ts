import { Component, Input, OnInit } from '@angular/core';
import { selectBookedBack, selectBookedThere } from 'src/app/redux/selectors/flight.selector';
import { Store } from '@ngrx/store';
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

  public bookedThere$ = this.store.select(selectBookedThere);

  public bookedBack$ = this.store.select(selectBookedBack);

  constructor(private store: Store) {}

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
