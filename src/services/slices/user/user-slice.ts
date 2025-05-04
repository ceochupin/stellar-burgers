import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { isPendingAction, isRejectedAction } from '@redux-types';

import {
  loginUser,
  logoutUser,
  registerUser,
  setIsAuthChecked,
  setUser,
  updateUser
} from '@slices';

type TUserState = {
  data: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  data: null,
  isAuthChecked: false,
  loading: true,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.data = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setIsAuthChecked, (state, action) => {
        state.isAuthChecked = action.payload;
      })
      .addCase(setUser, (state, action) => {
        state.data = action.payload;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  }
});

export default userSlice.reducer;
