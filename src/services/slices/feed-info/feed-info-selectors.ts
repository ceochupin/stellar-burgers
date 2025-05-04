// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectFeedInfoState = (state: RootState) => state.feedInfo;

export const selectFeedInfoItems = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.items
);

export const selectFeedInfoTotal = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.total
);

export const selectFeedInfoTotalToday = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.totalToday
);

export const selectFeedInfoStatus = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.loading
);

export const selectFeedInfoError = createSelector(
  [selectFeedInfoState],
  (feedInfoState) => feedInfoState.error
);

export const selectFeedInfoAllTotal = createSelector(
  [selectFeedInfoTotal, selectFeedInfoTotalToday],
  (total, totalToday) => ({
    total,
    totalToday
  })
);
