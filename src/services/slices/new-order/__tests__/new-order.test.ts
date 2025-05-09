import { mockErrorMessage, mockNewOrder } from './__mocks__/newOrderData';
import {
  initialStateNewOrder,
  newOrderSlice,
  clearNewOrder,
  createNewOrder,
  stopIsLoading,
  selectNewOrder,
  selectNewOrderStatus
} from '@slices';

describe('newOrderSlice: Redux store and actions', () => {
  describe('Actions on reducers in newOrderSlice', () => {
    it('should return the initial state', () => {
      expect(newOrderSlice.reducer(undefined, { type: '' })).toEqual(
        initialStateNewOrder
      );
    });

    describe('reducers', () => {
      describe('clearNewOrder', () => {
        it('should handle clear order', () => {
          expect(
            newOrderSlice.reducer(
              {
                ...initialStateNewOrder,
                order: mockNewOrder
              },
              clearNewOrder()
            )
          ).toEqual(initialStateNewOrder);
        });
      });

      describe('stopIsLoading', () => {
        it('should handle stop is loading status', () => {
          expect(
            newOrderSlice.reducer(
              { ...initialStateNewOrder, isLoading: true },
              stopIsLoading()
            )
          ).toEqual(initialStateNewOrder);
        });
      });
    });

    describe('extraReducers', () => {
      it('should handle pending state when fetching order', () => {
        expect(
          newOrderSlice.reducer(undefined, {
            type: createNewOrder.pending.type
          })
        ).toEqual({ ...initialStateNewOrder, isLoading: true });
      });

      it('should handle fulfilled state when order are fetched successfully', () => {
        expect(
          newOrderSlice.reducer(undefined, {
            type: createNewOrder.fulfilled.type,
            payload: mockNewOrder
          })
        ).toEqual({
          ...initialStateNewOrder,
          isLoading: false,
          order: mockNewOrder
        });
      });

      it('should handle rejected state when order fetch fails', () => {
        expect(
          newOrderSlice.reducer(undefined, {
            type: createNewOrder.rejected.type,
            error: { message: mockErrorMessage }
          })
        ).toEqual({
          ...initialStateNewOrder,
          isLoading: false,
          error: mockErrorMessage
        });
      });

      it('should handle rejected state with undefined error message', () => {
        expect(
          newOrderSlice.reducer(undefined, {
            type: createNewOrder.rejected.type,
            error: {}
          })
        ).toEqual({
          ...initialStateNewOrder,
          isLoading: false,
          error: 'Ошибка создания заказа'
        });
      });
    });
  });

  describe('Selectors in newOrderSlice', () => {
    const state = {
      newOrder: {
        ...initialStateNewOrder,
        order: mockNewOrder,
        isLoading: true
      } as typeof initialStateNewOrder
    };

    describe('selectNewOrder', () => {
      it('should select new order data', () => {
        expect(selectNewOrder(state)).toEqual(mockNewOrder);
      });
    });

    describe('selectNewOrderStatus', () => {
      it('should select loading state', () => {
        expect(selectNewOrderStatus(state)).toBe(true);
      });
    });
  });
});
