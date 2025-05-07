import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import {
  authSlice,
  ingredientsSlice,
  burgerSlice,
  ordersSlice,
  newOrderSlice
} from '@slices';

const rootReducer = combineSlices(
  authSlice,
  ingredientsSlice,
  burgerSlice,
  ordersSlice,
  newOrderSlice
);

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
