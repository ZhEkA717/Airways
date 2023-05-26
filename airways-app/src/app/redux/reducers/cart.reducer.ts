import { createReducer, on } from '@ngrx/store';
import {
  getCart,
  getCartError,
  getCartSuccess,
  resetCart,
  updateCart,
  updateCartError,
  updateCartSuccess,
} from '../actions/cart.action';
import { CartState } from '../models/redux-states';

export const CART_REDUCER_KEY = 'cart';

export const initialState: CartState = {
  loading: false,
  items: [],
};

export const cartReducer = createReducer(
  initialState,

  on(getCart, (state): CartState => ({
    ...state,
  })),

  on(getCartSuccess, (state, action): CartState => ({
    ...state,
    items: action.items,
  })),

  on(getCartError, (state): CartState => ({
    ...state,
  })),

  on(updateCart, (state): CartState => ({
    ...state,
    loading: true,
  })),

  on(updateCartSuccess, (state, action): CartState => ({
    ...state,
    items: action.cartItems,
    loading: action.loading,
  })),

  on(updateCartError, (state, action): CartState => ({
    ...state,
    loading: action.loading,
  })),

  on(resetCart, (state): CartState => ({
    ...state,
    items: [],
  })),
);
