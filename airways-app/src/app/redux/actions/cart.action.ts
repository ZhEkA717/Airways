import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';

export enum CartAction {
  getCart = '[CART] get cart',
  getCartSuccess = '[CART] get cart success',
  getCartError = '[CART] get cart error',
  addToCart = '[CART] add to cart',
  deleteFromCart = '[CART] delete from cart',
  payCartItem = '[CART] booked cart item',
}

export const getCart = createAction(
  CartAction.getCart,
  props<{ userId: number }>(),
);

export const getCartSuccess = createAction(
  CartAction.getCartSuccess,
  props<{ items: CartItem[] }>(),
);

export const getCartError = createAction(
  CartAction.getCartError,
);

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
