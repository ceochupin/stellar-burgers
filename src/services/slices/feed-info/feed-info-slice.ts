// TODO: Вынести интерфейс в локальные типы слайса для селекторов и сделать расширение типов

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedInfo } from '@slices';

type TFeedInfoState = {
  items: TOrder[] | [];
  total: number | null;
  totalToday: number | null;
  loading: boolean;
  error: string | null;
};

const initialState: TFeedInfoState = {
  items: [],
  total: null,
  totalToday: null,
  loading: true,
  error: null
};

export const feedInfoSlice = createSlice({
  name: 'feedInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export default feedInfoSlice.reducer;
