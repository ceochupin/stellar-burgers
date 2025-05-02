// TODO: Вынести интерфейс в локальные типы слайса для селекторов

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersList } from './orders-list-actions';

interface IOrdersListState {
  items: TOrder[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IOrdersListState = {
  items: [],
  status: 'idle',
  error: null
};

const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getOrdersList.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(getOrdersList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error?.message as string) ?? 'Неизвестная ошибка';
      });
  }
});

export default ordersListSlice.reducer;
