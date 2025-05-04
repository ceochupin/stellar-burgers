import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectUserOrdersState = (state: RootState) => state.userOrders;

export const selectUserOrdersItems = createSelector(
  [selectUserOrdersState],
  (userOrdersState) => userOrdersState.items
);

export const selectUserOrdersItem = createSelector(
  [selectUserOrdersState],
  (userOrdersState) => userOrdersState.item
);

export const selectUserOrdersStatus = createSelector(
  [selectUserOrdersState],
  (userOrdersState) => userOrdersState.orderRequest
);
