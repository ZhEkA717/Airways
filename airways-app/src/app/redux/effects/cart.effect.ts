import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
} from 'rxjs';
import HttpApiService from 'src/app/core/services/http-api.service';
import { CartAction, getCartError, getCartSuccess } from '../actions/cart.action';

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

  constructor(
    private actions$: Actions,
    private httpApiService: HttpApiService,
  ) { }
}
