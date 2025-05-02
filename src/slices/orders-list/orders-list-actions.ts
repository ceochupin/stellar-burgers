// TODO: Типизировать createAsyncThunk

import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersList = createAsyncThunk(
  'ordersList/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось получить заказы'
      );
    }
  }
);
