import store, { rootReducer } from '@redux-store';
import {
  initialStateAuth,
  initialStateBurger,
  initialStateIngredients,
  initialStateNewOrder,
  initialStateOrders
} from '@slices';

describe('rootReducer', () => {
  const initialRootState = {
    auth: initialStateAuth,
    burger: initialStateBurger,
    ingredients: initialStateIngredients,
    newOrder: initialStateNewOrder,
    orders: initialStateOrders
  };

  it('should return initial state for unknown action', () => {
    expect(rootReducer(undefined, { type: '' })).toEqual(store.getState());
  });

  it('should match store initial state', () => {
    expect(store.getState()).toEqual(initialRootState);
  });
});
