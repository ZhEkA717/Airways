import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/booking/models/cart.model';
import { addToCart } from '../actions/cart.action';

export const CART_REDUCER_KEY = 'cart';

export interface CartState {
  items: CartItem[],
}

export const initialState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, action): CartState => ({
    ...state,
    items: [...state.items, action.cart],
  })),
);
