import { ActionReducer, INIT } from '@ngrx/store';
import { State } from '../state.model';

const KEY_STATE = 'state';

export const hydrationMetaReducer = (
  reducer: ActionReducer<State>,
): ActionReducer<State> => (state, action) => {
  if (action.type === INIT) {
    const storageValue = localStorage.getItem(KEY_STATE);
    if (storageValue) {
      try {
        return JSON.parse(storageValue);
      } catch {
        localStorage.removeItem(KEY_STATE);
      }
    }
  }
  const nextState = reducer(state, action);
  localStorage.setItem(KEY_STATE, JSON.stringify(nextState));
  return nextState;
};
