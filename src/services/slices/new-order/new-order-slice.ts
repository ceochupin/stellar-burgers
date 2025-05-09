import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createNewOrder } from '@slices';

type TNewOrderState = {
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TNewOrderState = {
  order: null,
  isLoading: false,
  error: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.order = null;
    },
    stopIsLoading: (state) => {
      state.isLoading = false;
    }
  },
  selectors: {
    selectNewOrder: (state) => state.order,
    selectNewOrderStatus: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка создания заказа';
      });
  }
});

export const { clearNewOrder, stopIsLoading } = newOrderSlice.actions;

export const { selectNewOrder, selectNewOrderStatus } = newOrderSlice.selectors;

export { initialState as initialStateNewOrder };
