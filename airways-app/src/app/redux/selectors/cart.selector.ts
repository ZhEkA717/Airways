import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem } from '@shared/model/cart.model';
import { CART_REDUCER_KEY } from '../reducers/cart.reducer';
import { CartState } from '../models/redux-states';

export const selectCart = createFeatureSelector<CartState>(CART_REDUCER_KEY);

export const selectCartItems = createSelector(
  selectCart,
  (cart: CartState) => cart.items.filter((item) => !item.isPayed),
);

export const selectBuyedItems = createSelector(
  selectCart,
  (cart: CartState) => cart.items.filter((item) => item.isPayed),
);

export const selectAmountCart = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.length,
);

export const selectMaxId = createSelector(
  selectCart,
  (cart: CartState) => Math.max(...cart.items.map((item) => item.id), 0),
);
