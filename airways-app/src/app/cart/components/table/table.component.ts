import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { updateCart } from 'src/app/redux/actions/cart.action';
import { CartItem } from '../../../shared/model/cart.model';
import ConvertMoneyService from '../../../booking/services/convert-money.service';
import { selectCart, selectCartItems } from '../../../redux/selectors/cart.selector';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'select',
    'flightNo',
    'flight',
    'typetrip',
    'datetime',
    'passengers',
    'price',
    'actions',
  ];

  dataSource: MatTableDataSource<CartItem>;

  selection = new SelectionModel<CartItem>(true, []);

  total = 0;

  @Output() selectionEvent = new EventEmitter<CartItem[]>();

  private cartItems$ = this.store.select(selectCart);

  private cartItems!: CartItem[];

  private subCartItems!: Subscription;

  constructor(
    private store: Store,
    public currencyService: ConvertMoneyService,
  ) {
    this.dataSource = new MatTableDataSource<CartItem>([]);
    store.select(selectCartItems).subscribe((res) => {
      this.dataSource.data = res;
    });

    /** Selection event to get total price and count of selected */
    this.selection.changed.subscribe((sel) => {
      this.selectionEvent.emit(sel.source.selected);
      this.total = sel.source.selected.length
        ? sel.source.selected
          .map((item) => item.price)
          .reduce((acc, cur) => acc + cur)
        : 0;
    });
  }

  ngOnInit(): void {
    this.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  ngOnDestroy(): void {
    this.subCartItems?.unsubscribe();
  }

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
  checkboxLabel(row?: CartItem): string {
    return !row
      ? `${this.isAllSelected() ? 'deselect' : 'select'} all`
      : `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
        row.id + 1
      }`;
  }

  /** Delete row from table */
  delete(row: CartItem) {
    this.selection.deselect(row);
    this.store.dispatch(updateCart({
      cartItems: this.cartItems.filter((item) => item.id !== row.id),
    }));
  }
}
