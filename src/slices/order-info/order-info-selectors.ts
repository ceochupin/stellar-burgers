// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectOrderInfoState = (state: RootState) => state.orderInfo;

export const selectOrderInfoItem = createSelector(
  [selectOrderInfoState],
  (orderInfoState) => orderInfoState.item
);

export const selectOrderInfoStatus = createSelector(
  [selectOrderInfoState],
  (orderInfoState) => orderInfoState.status
);

export const selectOrderInfoError = createSelector(
  [selectOrderInfoState],
  (orderInfoState) => orderInfoState.error
);
