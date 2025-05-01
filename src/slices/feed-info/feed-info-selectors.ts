// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

const selectFeedInfoState = (state: RootState) => state.feedInfo;

export const selectFeedInfoOrders = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.orders
);

export const selectFeedInfoStatus = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.status
);

export const selectFeedInfoTotal = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.total
);

export const selectFeedInfoTotalToday = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.totalToday
);

export const selectFeedInfoAllTotal = createSelector(
  [selectFeedInfoTotal, selectFeedInfoTotalToday],
  (total, totalToday) => ({
    total,
    totalToday
  })
);
