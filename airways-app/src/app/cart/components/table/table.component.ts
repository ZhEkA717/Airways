import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Trip } from '../../../shared/model/trip.model';
import { Passenger } from '../../../shared/model/persons.model';

// TODO: need to merge with ZhEkA's flight interface ig he implements

export type FlightType = 'One way' | 'Round trip';

export interface Flight {
  id: string;
  flightNo: string;
  forwardTrip: Trip;
  backTrip: Trip;
  type: FlightType;
  passengers: Passenger[];
}

// TODO: temporary flight replace
export interface MockFlight {
  id: number,
  flightNo: string;
  to: { city: string; dateTime: string };
  from: { city: string; dateTime: string };
  type: FlightType;
  passengers: string[];
  price: string
}

const ELEMENT_DATA: MockFlight[] = [
  {
    id: 1, flightNo: 'BS1416', to: { city: 'Brussels', dateTime: '13.05.2023 14:50:00 - 21:00:00' }, from: { city: 'Berlin', dateTime: '14.05.2023 8:00:00 - 14:10:00' }, type: 'Round trip', passengers: ['1 x Adult', '1 x Child', '1 x Infant'], price: '$551.38',
  },
  {
    id: 2, flightNo: 'BT948', to: { city: 'Barselona', dateTime: '16.05.2023 8:00:00 - 12:10:00' }, from: { city: 'Berlin', dateTime: '16.05.2023 18:00:00 - 22:10:00' }, type: 'One way', passengers: ['1 x Adult'], price: '$20.96',
  },
  {
    id: 3, flightNo: 'CP1661', to: { city: 'Tel Aviv', dateTime: '18.05.2023 17:40:00 - 22:40:00' }, from: { city: 'Barselona', dateTime: '19.05.2023 8:00:00 - 13:00:00' }, type: 'One way', passengers: ['1 x Adult', '1 x Child'], price: '$192.15',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = ['select', 'flightNo', 'flight', 'typetrip', 'datetime', 'passengers', 'price', 'actions'];

  dataSource = new MatTableDataSource<MockFlight>(ELEMENT_DATA);

  selection = new SelectionModel<MockFlight>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: MockFlight): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
