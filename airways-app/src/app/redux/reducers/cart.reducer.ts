import { createReducer, on } from '@ngrx/store';
import {
  getCartError,
  getCartSuccess,
  resetCart,
  updateCartError,
  updateCartSuccess,
} from '../actions/cart.action';
import { CartState } from '../models/redux-states';

export const CART_REDUCER_KEY = 'cart';

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(getCartSuccess, (state, action): CartState => ({
    ...state,
    items: action.items,
  })),

  on(getCartError, (state): CartState => ({
    ...state,
  })),

  on(updateCartSuccess, (state, action): CartState => ({
    ...state,
    items: action.cartItems,
  })),

  on(updateCartError, (state): CartState => ({
    ...state,
  })),

  on(resetCart, (state): CartState => ({
    ...state,
    items: [],
  })),
);
