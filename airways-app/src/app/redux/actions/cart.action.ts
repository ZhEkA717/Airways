import { createAction, props } from '@ngrx/store';
import { CartItem } from '@shared/model/cart.model';

export enum CartAction {
  addToCart = '[CART] add to cart',
  deleteFromCart = '[CART] delete from cart',
  payCartItem = '[CART] booked cart item',
}

export const addToCart = createAction(
  CartAction.addToCart,
  props<{ cart: CartItem }>(),
);

export const deleteFromCart = createAction(
  CartAction.deleteFromCart,
  props<{ id: number }>(),
);

export const payCartItem = createAction(
  CartAction.payCartItem,
  props<{ id: number }>(),
);
