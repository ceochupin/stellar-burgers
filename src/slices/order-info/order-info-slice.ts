import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderInfo } from './order-info-actions';

interface IOrderInfoState {
  item: TOrder | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IOrderInfoState = {
  item: null,
  status: 'idle',
  error: null
};

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderInfo.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getOrderInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.item = action.payload.orders;
      })
      .addCase(getOrderInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error?.message as string) ?? 'Неизвестная ошибка';
      });
  }
});

export default orderInfoSlice.reducer;
