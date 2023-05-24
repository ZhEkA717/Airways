import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';
import {
  addToCart,
  deleteFromCart,
  getCartError,
  getCartSuccess,
  payCartItem,
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

  on(addToCart, (state, action): CartState => ({
    ...state,
    items: [...state.items, action.cart],
  })),

  on(deleteFromCart, (state, action): CartState => ({
    ...state,
    items: state.items.filter((item) => item.id !== action.id),
  })),

  on(payCartItem, (state, action): CartState => ({
    ...state,
    items: [...state.items].map((item) => {
      const newItem: CartItem = { ...item };
      if (newItem.id === action.id) newItem.isPayed = true;
      return newItem;
    }),
  })),
);
