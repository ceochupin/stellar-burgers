// TODO: Типизировать createAsyncThunk

import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersList = createAsyncThunk(
  'ordersList/getAll',
  async () => await getOrdersApi()
);
