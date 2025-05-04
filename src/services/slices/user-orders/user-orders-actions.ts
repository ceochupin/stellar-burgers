import { getOrdersApi, orderBurgerApi } from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const createUserOrder = createAsyncThunk(
  'userOrders/create',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getUserOrders = createAsyncThunk(
  'userOrders/getAll',
  async () => await getOrdersApi()
);
