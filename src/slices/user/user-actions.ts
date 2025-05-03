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
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось получить пользователя'
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const res = await registerUserApi(data);

      setCookie('accessToken', res.accessToken.split(' ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось зарегистрировать пользователя'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const res = await loginUserApi(data);

      setCookie('accessToken', res.accessToken.split(' ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось залогинить пользователя'
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось выполнидь выход пользователя'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      return await updateUserApi(data);
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось обновить пользователя'
      );
    }
  }
);

export const forgotUserPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      await forgotPasswordApi({ email });
    } catch (error) {
      return rejectWithValue(
        (error as Error).message ||
          'Не удалось восстановить пароль пользователя'
      );
    }
  }
);

export const resetUserPassword = createAsyncThunk(
  'user/resetPassword',
  async (
    { password, token }: { password: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      await resetPasswordApi({ password, token });
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось сбросить пароль пользователя'
      );
    }
  }
);
