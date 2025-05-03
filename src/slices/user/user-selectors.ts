// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectUserState = (state: RootState) => state.user;

export const selectUserData = createSelector(
  [selectUserState],
  (userState) => userState.data
);

export const selectIsAuthChecked = createSelector(
  [selectUserState],
  (userState) => userState.isAuthChecked
);

export const selectUserStatus = createSelector(
  [selectUserState],
  (userState) => userState.status
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState) => userState.error
);

export const selectIsAuthUser = createSelector(
  [selectUserData, selectIsAuthChecked],
  (user, isAuthChecked) => isAuthChecked && user !== null
);
