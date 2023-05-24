import { createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';

export enum CartAction {
  getCart = '[CART] get cart',
  getCartSuccess = '[CART] get cart success',
  getCartError = '[CART] get cart error',
  updateCart = '[CART] update cart',
  updateCartSuccess = '[CART] update cart success',
  updateCartError = '[CART] update cart error',
  resetCart = '[CART] reset cart',
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

export const updateCart = createAction(
  CartAction.updateCart,
  props<{ cartItems: CartItem[] }>(),
);

export const updateCartSuccess = createAction(
  CartAction.updateCartSuccess,
  props<{ cartItems: CartItem[] }>(),
);

export const updateCartError = createAction(
  CartAction.updateCartSuccess,
);

export const resetCart = createAction(
  CartAction.resetCart,
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
