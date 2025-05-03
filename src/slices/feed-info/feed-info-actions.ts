// TODO: Типизировать createAsyncThunk

import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedInfo = createAsyncThunk(
  'feedInfo/getAll',
  async () => await getFeedsApi()
);
