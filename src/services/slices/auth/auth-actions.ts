import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '@cookie';
import { setIsAuthChecked, setUser } from './auth-slice';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const logoutUser = createAsyncThunk('user/logout', async () =>
  logoutApi()
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (data: TRegisterData) => updateUserApi(data)
);

export const forgotUserPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string) => forgotPasswordApi({ email })
);

export const resetUserPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token }: { password: string; token: string }) =>
    resetPasswordApi({ password, token })
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((user) => dispatch(setUser(user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
