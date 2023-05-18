import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { CartItem } from '../../../shared/model/cart.model';
import ConvertMoneyService from '../../../booking/services/convert-money.service';
import { selectCartItems } from '../../../redux/selectors/cart.selector';

@Component({
  selector: 'app-account-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = ['flightNo', 'flight', 'typetrip', 'datetime', 'passengers', 'price'];

  dataSource: MatTableDataSource<CartItem>;

  constructor(public currencyService: ConvertMoneyService, private store: Store) {
    this.dataSource = new MatTableDataSource<CartItem>([]);
    store.select(selectCartItems).subscribe((res) => { this.dataSource.data = res; });
  }

  /** Onclick row from table */
  goSummary(row: CartItem) {
    console.log(row);
  }
}
