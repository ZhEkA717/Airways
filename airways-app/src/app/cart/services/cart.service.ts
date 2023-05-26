import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCartItems } from '@redux/selectors/cart.selector';
import { CartItem } from '@shared/model/cart.model';
import { deleteFromCart } from '@redux/actions/cart.action';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public table: CartItem[] = [];

  constructor(private store: Store) {
    store.select(selectCartItems).subscribe((res) => { this.table = res; });
  }

  getTotalPrice() {
    if (this.table.length === 0) return 0;
    return this.table.map((item) => item.price).reduce((acc, cur) => acc + cur);
  }

  delete(row: CartItem) {
    this.store.dispatch(deleteFromCart({ id: row.id }));
  }
}
