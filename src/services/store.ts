import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { ingredientsSlice } from '@slices';
import { burgerSlice } from '@slices';
import { feedInfoSlice } from '@slices';
import { ordersListSlice } from '@slices';
import { orderInfoSlice } from '@slices';
import { userSlice } from '@slices';

const rootReducer = combineSlices(
  ingredientsSlice,
  burgerSlice,
  feedInfoSlice,
  ordersListSlice,
  orderInfoSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;
