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

  it('should return state', () => {
    expect(rootReducer(undefined, { type: '' })).toEqual(store.getState());
  });

  it('should return the initial state', () => {
    expect(store.getState()).toEqual(initialRootState);
  });
});
