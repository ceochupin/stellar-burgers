import { mockErrorMessage, mockIngredients } from './__mocks__/ingredientsData';
import {
  initialStateIngredients,
  getIngredients,
  ingredientsSlice,
  selectIngredientsError,
  selectIngredientsIsLoading,
  selectIngredientsItems
} from '@slices';

describe('ingredientsSlice: Redux store and actions', () => {
  describe('Actions on reducers in ingredientsSlice', () => {
    it('should return the initial state', () => {
      expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
        initialStateIngredients
      );
    });

    it('should handle pending state when fetching ingredients', () => {
      expect(
        ingredientsSlice.reducer(initialStateIngredients, {
          type: getIngredients.pending.type
        })
      ).toEqual({ ...initialStateIngredients, isLoading: true });
    });

    it('should handle fulfilled state when ingredients are fetched successfully', () => {
      expect(
        ingredientsSlice.reducer(initialStateIngredients, {
          type: getIngredients.fulfilled.type,
          payload: mockIngredients
        })
      ).toEqual({
        ...initialStateIngredients,
        isLoading: false,
        items: mockIngredients
      });
    });

    it('should handle rejected state when ingredients fetch fails', () => {
      expect(
        ingredientsSlice.reducer(initialStateIngredients, {
          type: getIngredients.rejected.type,
          error: { message: mockErrorMessage }
        })
      ).toEqual({
        ...initialStateIngredients,
        isLoading: false,
        error: mockErrorMessage
      });
    });

    it('should handle rejected state with undefined error message', () => {
      expect(
        ingredientsSlice.reducer(initialStateIngredients, {
          type: getIngredients.rejected.type,
          error: {}
        })
      ).toEqual({
        ...initialStateIngredients,
        isLoading: false,
        error: 'Ошибка загрузки ингредиентов'
      });
    });
  });

  describe('Selectors in ingredientsSlice', () => {
    const state = {
      ingredients: {
        items: mockIngredients,
        isLoading: true,
        error: mockErrorMessage
      } as typeof initialStateIngredients
    };

    describe('selectIngredientsItems', () => {
      it('should select all ingredients', () => {
        expect(selectIngredientsItems(state)).toEqual(mockIngredients);
      });
    });

    describe('selectIngredientsIsLoading', () => {
      it('should select loading state', () => {
        expect(selectIngredientsIsLoading(state)).toBe(true);
      });
    });

    describe('selectIngredientsError', () => {
      it('should select error', () => {
        expect(selectIngredientsError(state)).toBe(mockErrorMessage);
      });
    });
  });
});
