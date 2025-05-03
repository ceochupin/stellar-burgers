// TODO: Вынести интерфейс в локальные типы слайса для селекторов и сделать расширение типов

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import { getFeedInfo } from './feed-info-actions';

interface IFeedInfoState {
  items: TOrder[];
  total: number | null;
  totalToday: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IFeedInfoState = {
  items: [],
  total: null,
  totalToday: null,
  status: 'idle',
  error: null
};

const feedInfoSlice = createSlice({
  name: 'feedInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getFeedInfo.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.status = 'succeeded';
          state.items = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(getFeedInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message as string;
      });
  }
});

export default feedInfoSlice.reducer;
