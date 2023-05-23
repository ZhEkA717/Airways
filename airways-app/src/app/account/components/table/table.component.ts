import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { send as sendPassengersForm } from 'src/app/redux/actions/passengers.action';
import { send as sendSearch } from 'src/app/redux/actions/search.action';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { saveFlight } from 'src/app/redux/actions/flight.action';
import { TripState } from 'src/app/redux/models/redux-states';
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

  private cart!: CartItem[];

  constructor(
    public currencyService: ConvertMoneyService,
    private store: Store,
    private router: Router,
  ) {
    this.dataSource = new MatTableDataSource<CartItem>([]);
    store.select(selectBuyedItems).subscribe((res) => {
      this.dataSource.data = res;
      this.cart = res;
    });
  }

  /** Onclick row from table */
  goSummary(row: CartItem) {
    this.store.dispatch(sendPassengersForm(
      row.passengersForm.passengersForm as PassengersForm,
    ));
    this.store.dispatch(sendSearch(row.search.searchForm as FlightSearch));
    this.store.dispatch(saveFlight(row.flight as TripState));
    this.router.navigate(['/booking', 'review'], { queryParams: { fromaccount: true } });
  }
}
