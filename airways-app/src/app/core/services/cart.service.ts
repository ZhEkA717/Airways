import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { selectCartItems } from '../../redux/selectors/cart.selector';
import { CartItem } from '../../shared/model/cart.model';
import { deleteFromCart } from '../../redux/actions/cart.action';
import HttpApiService from './http-api.service';
import AuthService from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public table: CartItem[] = [];

  constructor(
    private store: Store,
    private httpApi: HttpApiService,
    private authService: AuthService,
  ) {
    store.select(selectCartItems).subscribe((res) => { this.table = res; });
  }

  getTotalPrice() {
    if (this.table.length === 0) return 0;
    return this.table.map((item) => item.price).reduce((acc, cur) => acc + cur);
  }

  delete(row: CartItem) {
    this.store.dispatch(deleteFromCart({ id: row.id }));
  }

  updateCart(items: CartItem[]) {
    return this.authService.userId
      ? this.httpApi.updateCart({ userId: this.authService.userId, items })
      : EMPTY;
  }

  addToCart(items: CartItem[], item: CartItem) {
    return [...items, item];
  }

  deleteFromCart(items: CartItem[], id: number) {
    return items.filter((item) => item.id !== id);
  }

  getCart() {
    return this.httpApi.getCart(this.authService.userId);
  }
}
