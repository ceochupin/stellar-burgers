import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeedInfo = createAsyncThunk(
  'feedInfo/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось получить ленту'
      );
    }
  }
);
