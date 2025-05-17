import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedOrders, getUserOrders, getOrderByNumber } from '@slices';

type TOrdersState = {
  // данные для ленты всех заказов
  feedOrders: TOrder[];
  feedOrdersTotal: number | null;
  feedOrdersTotalToday: number | null;

  // данные для ленты заказов пользователя
  userOrders: TOrder[];

  // данные заказа по его номеру заказа
  orderByNumber: TOrder | null;

  // общие статусы и ошибки
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  feedOrders: [],
  feedOrdersTotal: null,
  feedOrdersTotalToday: null,

  userOrders: [],

  orderByNumber: null,

  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderByNumber: (state) => {
      state.orderByNumber = null;
    }
  },
  selectors: {
    selectFeedOrders: (state) => state.feedOrders,
    selectFeedOrdersTotal: (state) => state.feedOrdersTotal,
    selectFeedOrdersTotalToday: (state) => state.feedOrdersTotalToday,
    selectUserOrders: (state) => state.userOrders,
    selectOrderByNumber: (state) => state.orderByNumber,
    selectOrdersIsLoading: (state) => state.isLoading,
    selectOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      // общяя лента
      .addCase(getFeedOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedOrders = action.payload.orders;
        state.feedOrdersTotal = action.payload.total;
        state.feedOrdersTotalToday = action.payload.totalToday;
      })
      .addCase(getFeedOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ленты заказов';
      })

      // лента пользователя
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Ошибка загрузки заказов пользователя';
      })

      // поиск заказа по номеру
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderByNumber = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message ?? 'Ошибка загрузки заказа по номеру';
      });
  }
});

export const {
  selectFeedOrders,
  selectFeedOrdersTotal,
  selectFeedOrdersTotalToday,
  selectUserOrders,
  selectOrderByNumber,
  selectOrdersIsLoading,
  selectOrdersError
} = ordersSlice.selectors;

export const { clearOrderByNumber } = ordersSlice.actions;

export { initialState as initialStateOrders };
