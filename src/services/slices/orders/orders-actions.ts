import { getFeedsApi, getOrdersApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedOrders = createAsyncThunk(
  'orders/getFeedOrders',
  getFeedsApi
);

export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  getOrdersApi
);

export const getOrderByNumber = createAsyncThunk(
  'orders/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);
