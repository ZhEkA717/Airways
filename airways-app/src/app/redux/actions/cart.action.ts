import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';

export enum CartAction {
  addToCart = '[CART] add to cart',
  deleteFromCart = '[CART] delete from cart',
}

export const addToCart = createAction(
  CartAction.addToCart,
  props<{ cart: CartItem }>(),
);

export const deleteFromCart = createAction(
  CartAction.deleteFromCart,
  props<{ id: number }>(),
);
