import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '../../redux/selectors/cart.selector';
import { CartItem } from '../../shared/model/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public table: CartItem[] = [];

  constructor(private store: Store) {
    // this.table = MOCK_DATA;
    store.select(selectCartItems).subscribe((res) => { this.table = res; });
  }

  getTotalPrice() {
    return 764.49;
  }

  delete(row: CartItem) {
    this.table = this.table.filter((fligth) => fligth.id !== row.id);
  }
}
