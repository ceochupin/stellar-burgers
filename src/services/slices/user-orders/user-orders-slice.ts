import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { createUserOrder, getUserOrders } from '@slices';
import { isPendingAction, isRejectedAction } from '@redux-types';

type TUserOrdersState = {
  items: TOrder[];
  item: TOrder | null;
  loading: boolean;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  items: [],
  item: null,
  loading: false,
  orderRequest: false,
  error: null
};

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    clearUserOrderItem: (state) => {
      state.item = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserOrder.pending, (state) => {
        state.orderRequest = true;
        state.item = null;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.item = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  }
});

export const { clearUserOrderItem } = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
