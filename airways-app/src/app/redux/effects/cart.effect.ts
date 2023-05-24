import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
} from 'rxjs';
import HttpApiService from 'src/app/core/services/http-api.service';
import { CartService } from 'src/app/core/services/cart.service';
import {
  CartAction,
  getCartError,
  getCartSuccess,
  updateCartError,
  updateCartSuccess,
} from '../actions/cart.action';

@Injectable()
export default class CartEffect {
  public getCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartAction.getCart),
    mergeMap(({ userId }) => this.httpApiService
      .getCart(userId).pipe(
        map(
          (items) => getCartSuccess({ items }),
        ),
      )),
    catchError(() => of(getCartError())),
  ));

  public updateCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartAction.updateCart),
    mergeMap(({ cartItems }) => this.cartService
      .updateCart(cartItems).pipe(
        map(
          (cart) => updateCartSuccess({ cartItems: cart.items, loading: false }),
        ),
      )),
    catchError(() => of(updateCartError({ loading: false }))),
  ));

  constructor(
    private actions$: Actions,
    private httpApiService: HttpApiService,
    private cartService: CartService,
  ) {}
}
