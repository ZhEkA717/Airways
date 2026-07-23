import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from '../../../shared/model/cart.model';
import ConvertMoneyService from '../../../booking/services/convert-money.service';
import { selectBuyedItems } from '../../../redux/selectors/cart.selector';

@Component({
  selector: 'app-account-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = ['flightNo', 'flight', 'typetrip', 'datetime', 'passengers', 'price'];

  dataSource: MatTableDataSource<CartItem>;

  constructor(
    public currencyService: ConvertMoneyService,
    private store: Store,
    private router: Router,
    private cartService: CartService,
  ) {
    this.dataSource = new MatTableDataSource<CartItem>([]);
    this.store.select(selectBuyedItems).subscribe((res) => {
      this.dataSource.data = res;
    });
  }

  /** Onclick row from table */
  public goSummary(row: CartItem) {
    this.cartService.dispatchClickedTrip(row);
    this.router.navigate(['/booking', 'review'], {
      queryParams: { fromaccount: true },
    });
  }
}
