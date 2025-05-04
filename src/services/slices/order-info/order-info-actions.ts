// TODO: Типизировать createAsyncThunk

import { getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderInfo = createAsyncThunk(
  'orderInfo/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);
