import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { send as sendPassengersForm } from 'src/app/redux/actions/passengers.action';
import { send as sendSearch } from 'src/app/redux/actions/search.action';
import { PassengersForm } from 'src/app/booking/models/passengers.model';
import { FlightSearch } from 'src/app/main/model/flight-search.model';
import { saveFlight } from 'src/app/redux/actions/flight.action';
import { TripState } from 'src/app/redux/models/redux-states';
import AuthService from '../../auth/services/auth.service';
import HttpApiService from './http-api.service';
import { CartItem } from '../../shared/model/cart.model';
import { selectCartItems } from '../../redux/selectors/cart.selector';

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

  payCartItem(items: CartItem[], id: number) {
    return [...items].map((item) => {
      const newItem: CartItem = { ...item };
      if (newItem.id === id) newItem.isPayed = true;
      return newItem;
    });
  }

  editCartItem(items: CartItem[], id: number, editCartItem: CartItem) {
    return items.map((item) => (item.id === id ? editCartItem : item));
  }

  getCart() {
    return this.httpApi.getCart(this.authService.userId);
  }

  public dispatchClickedTrip(row: CartItem) {
    this.store.dispatch(sendPassengersForm(
      row.passengersForm.passengersForm as PassengersForm,
    ));
    this.store.dispatch(sendSearch(row.search.searchForm as FlightSearch));
    this.store.dispatch(saveFlight(row.flight as TripState));
  }
}
