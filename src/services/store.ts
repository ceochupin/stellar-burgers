import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerIngredientsReducer from '../slices/burger-ingredients/burger-ingredients-slice';
import burgerConstructorReducer from '../slices/burger-constructor/burger-constructor-slice';
import feedInfoReducer from '../slices/feed-info/feed-info-slice';
import ordersListReducer from '../slices/orders-list/orders-list-slice';
import orderInfoReducer from '../slices/order-info/order-info-slice';
import userReducer from '../slices/user/user-slice';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  feedInfo: feedInfoReducer,
  ordersList: ordersListReducer,
  orderInfo: orderInfoReducer,
  user: userReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
