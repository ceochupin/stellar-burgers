import {
  mockErrorMessage,
  mockFeedOrders,
  mockUserOrders,
  mockOrder
} from './__mocks__/ordersData';
import {
  initialStateOrders,
  ordersSlice,
  clearOrderByNumber,
  getFeedOrders,
  getOrderByNumber,
  getUserOrders,
  selectOrdersError,
  selectOrdersIsLoading,
  selectOrderByNumber,
  selectUserOrders,
  selectFeedOrdersTotalToday,
  selectFeedOrdersTotal,
  selectFeedOrders
} from '@slices';

describe('ordersSlice: Redux store and actions', () => {
  describe('Actions on reducers in ordersSlice', () => {
    it('should return the initial state', () => {
      expect(ordersSlice.reducer(undefined, { type: '' })).toEqual(
        initialStateOrders
      );
    });

    describe('extraReducers', () => {
      describe('getFeedOrders', () => {
        it('should handle pending state when fetching feed orders', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getFeedOrders.pending.type
            })
          ).toEqual({ ...initialStateOrders, isLoading: true });
        });

        it('should handle fulfilled state when feed orders are fetched successfully', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getFeedOrders.fulfilled.type,
              payload: mockFeedOrders
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            feedOrders: mockFeedOrders.orders,
            feedOrdersTotal: mockFeedOrders.total,
            feedOrdersTotalToday: mockFeedOrders.totalToday
          });
        });

        it('should handle rejected state when feed orders fetch fails', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getFeedOrders.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getFeedOrders.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: 'Ошибка загрузки ленты заказов'
          });
        });
      });

      describe('getUserOrders', () => {
        it('should handle pending state when fetching user orders', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getUserOrders.pending.type
            })
          ).toEqual({ ...initialStateOrders, isLoading: true });
        });

        it('should handle fulfilled state when user orders are fetched successfully', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getUserOrders.fulfilled.type,
              payload: mockUserOrders
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            userOrders: mockUserOrders
          });
        });

        it('should handle rejected state when user orders fetch fails', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getUserOrders.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getUserOrders.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: 'Ошибка загрузки заказов пользователя'
          });
        });
      });

      describe('getOrderByNumber', () => {
        it('should handle pending state when fetching order by number', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getOrderByNumber.pending.type
            })
          ).toEqual({ ...initialStateOrders, isLoading: true });
        });

        it('should handle fulfilled state when user order by number are fetched successfully', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getOrderByNumber.fulfilled.type,
              payload: mockOrder
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            orderByNumber: mockOrder
          });
        });

        it('should handle rejected state when user order by number fetch fails', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getOrderByNumber.rejected.type,
              error: { message: mockErrorMessage }
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: mockErrorMessage
          });
        });

        it('should handle rejected state with undefined error message', () => {
          expect(
            ordersSlice.reducer(undefined, {
              type: getOrderByNumber.rejected.type,
              error: {}
            })
          ).toEqual({
            ...initialStateOrders,
            isLoading: false,
            error: 'Ошибка загрузки заказа по номеру'
          });
        });
      });
    });

    describe('reducers', () => {
      describe('clearOrderByNumber', () => {
        it('should handle clear order for modal details', () => {
          expect(
            ordersSlice.reducer(
              {
                ...initialStateOrders,
                orderByNumber: mockOrder
              },
              clearOrderByNumber()
            )
          ).toEqual(initialStateOrders);
        });
      });
    });
  });

  describe('Selectors in ordersSlice', () => {
    const state = {
      orders: {
        feedOrders: mockFeedOrders.orders,
        feedOrdersTotal: mockFeedOrders.total,
        feedOrdersTotalToday: mockFeedOrders.totalToday,
        userOrders: mockUserOrders,
        orderByNumber: mockOrder,
        isLoading: true,
        error: mockErrorMessage
      } as typeof initialStateOrders
    };

    describe('selectFeedOrders', () => {
      it('should select all ingredients', () => {
        expect(selectFeedOrders(state)).toEqual(mockFeedOrders.orders);
      });
    });

    describe('selectFeedOrdersTotal', () => {
      it('should select loading state', () => {
        expect(selectFeedOrdersTotal(state)).toEqual(mockFeedOrders.total);
      });
    });

    describe('selectFeedOrdersTotalToday', () => {
      it('should select error', () => {
        expect(selectFeedOrdersTotalToday(state)).toEqual(
          mockFeedOrders.totalToday
        );
      });
    });

    describe('selectUserOrders', () => {
      it('should select error', () => {
        expect(selectUserOrders(state)).toEqual(mockUserOrders);
      });
    });

    describe('selectOrderByNumber', () => {
      it('should select error', () => {
        expect(selectOrderByNumber(state)).toEqual(mockOrder);
      });
    });

    describe('selectOrdersIsLoading', () => {
      it('should select error', () => {
        expect(selectOrdersIsLoading(state)).toBe(true);
      });
    });

    describe('selectOrdersError', () => {
      it('should select error', () => {
        expect(selectOrdersError(state)).toEqual(mockErrorMessage);
      });
    });
  });
});
