import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartItem } from 'src/app/shared/model/cart.model';
import { CART_REDUCER_KEY } from '../reducers/cart.reducer';
import { CartState } from '../models/redux-states';

export const selectFeatureCart = createFeatureSelector<CartState>(CART_REDUCER_KEY);

export const selectCart = createSelector(
  selectFeatureCart,
  (cart: CartState) => cart.items,
);

export const selectCartLoading = createSelector(
  selectFeatureCart,
  (cart: CartState) => cart.loading,
);

export const selectCartItems = createSelector(
  selectFeatureCart,
  (cart: CartState) => cart.items.filter((item) => !item.isPayed),
);

export const selectBuyedItems = createSelector(
  selectFeatureCart,
  (cart: CartState) => cart.items.filter((item) => item.isPayed),
);

export const selectAmountCart = createSelector(
  selectCartItems,
  (items: CartItem[]) => items.length,
);

export const selectMaxId = createSelector(
  selectFeatureCart,
  (cart: CartState) => Math.max(...cart.items.map((item) => item.id), 0),
);
