import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedInfo } from './feed-info-actions';

interface IFeedInfoState extends TOrdersData {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IFeedInfoState = {
  orders: [],
  total: null,
  totalToday: null,
  status: 'idle',
  error: null
};

const feedInfoSlice = createSlice({
  name: 'feedInfo',
  initialState,
  reducers: {},
  selectors: {
    selectFeedInfoStatus: (state) => state.status,
    selectFeedInfoOrders: (state) => state.orders,
    // selectFeedInfoAllTotal: createSelector(
    //   [(state: IFeedInfoState) => state],
    //   (state) => ({
    //     total: state.total,
    //     totalToday: state.totalToday
    //   })
    // )
    selectFeedInfoAllTotal: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    })
  },
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
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(getFeedInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message as string) || 'Неизвестная ошибка';
      });
  }
});

export const {
  selectFeedInfoStatus,
  selectFeedInfoOrders,
  selectFeedInfoAllTotal
} = feedInfoSlice.selectors;

export default feedInfoSlice.reducer;
