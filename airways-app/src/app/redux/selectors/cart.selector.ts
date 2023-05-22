import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';
import { CART_REDUCER_KEY, CartState } from '../reducers/cart.reducer';

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
  selectCartItems,
  (items: CartItem[]) => Math.max(...items.map((item) => item.id), 0),
);
