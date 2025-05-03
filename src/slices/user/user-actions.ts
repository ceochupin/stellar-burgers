// TODO: Типизировать createAsyncThunk

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
import { deleteCookie, setCookie } from '../../utils/cookie';

export const fetchUser = createAsyncThunk(
  'user/fetch',
  async () => await getUserApi()
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => await logoutApi()
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const forgotUserPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string) => await forgotPasswordApi({ email })
);

export const resetUserPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ password, token }: { password: string; token: string }) =>
    await resetPasswordApi({ password, token })
);
