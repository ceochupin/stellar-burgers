import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderInfo } from '@slices';

type TOrderInfoState = {
  item: TOrder | null;
  loading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  item: null,
  loading: true,
  error: null
};

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.item = action.payload;
    });
  }
});

export default orderInfoSlice.reducer;
