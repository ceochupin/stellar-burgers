// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

const selectOrdersListState = (state: RootState) => state.ordersList;

export const selectOrdersListItems = createSelector(
  [selectOrdersListState],
  (ordersListState) => ordersListState.items
);

export const selectOrdersListStatus = createSelector(
  [selectOrdersListState],
  (ordersListState) => ordersListState.status
);

export const selectOrdersListError = createSelector(
  [selectOrdersListState],
  (ordersListState) => ordersListState.error
);
