import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createNewOrder } from '@slices';

type TNewOrderState = {
  newOrder: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TNewOrderState = {
  newOrder: null,
  isLoading: false,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    }
  },
  selectors: {
    selectNewOrder: (state) => state.newOrder,
    selectNewOrderStatus: (state) => state.isLoading,
    selectNewOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.newOrder = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания заказа';
      });
  }
});

export const { clearNewOrder } = newOrderSlice.actions;

export const { selectNewOrder, selectNewOrderStatus, selectNewOrderError } =
  newOrderSlice.selectors;

export default newOrderSlice.reducer;
