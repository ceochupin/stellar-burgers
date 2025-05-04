// TODO: Вынести интерфейс в локальные типы слайса для селекторов

import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersList } from '@slices';

type IOrdersListState = {
  items: TOrder[];
  loading: boolean;
  error: string | null;
};

const initialState: IOrdersListState = {
  items: [],
  loading: true,
  error: null
};

export const ordersListSlice = createSlice({
  name: 'ordersList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrdersList.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
  }
});

export default ordersListSlice.reducer;
