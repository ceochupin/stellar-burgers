// TODO: Типизировать createAsyncThunk

import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderInfo = createAsyncThunk(
  'orderInfo/getOrderByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      return await getOrderByNumberApi(number);
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось получить ззаказ'
      );
    }
  }
);
