import { initialState, ingredientsSlice } from '../ingredients-slice';
import { getIngredients } from '../ingredients-actions';
import { mockErrorMessage, mockIngredients } from './__mocks__/data';

describe('Ingredients slice redux store and actions', () => {
  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  it('should handle pending state when fetching ingredients', () => {
    expect(
      ingredientsSlice.reducer(undefined, { type: getIngredients.pending.type })
    ).toEqual({ ...initialState, isLoading: true });
  });

  it('should handle fulfilled state when ingredients are fetched successfully', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: getIngredients.fulfilled.type,
        payload: mockIngredients
      })
    ).toEqual({ ...initialState, isLoading: false, items: mockIngredients });
  });

  it('should handle rejected state when ingredients fetch fails', () => {
    expect(
      ingredientsSlice.reducer(undefined, {
        type: getIngredients.rejected.type,
        error: { message: mockErrorMessage }
      })
    ).toEqual({
      ...initialState,
      isLoading: false,
      error: mockErrorMessage
    });
  });
});

describe('Ingredients slice selectors', () => {
  const state = {
    ingredients: {
      items: mockIngredients,
      isLoading: false,
      error: null
    }
  };

  it('should select all ingredients items', () => {
    expect(ingredientsSlice.selectors.selectIngredientsItems(state)).toEqual(
      mockIngredients
    );
  });

  it('should select loading state', () => {
    expect(
      ingredientsSlice.selectors.selectIngredientsIsLoading(state)
    ).toEqual(false);
  });

  it('should select error', () => {
    expect(ingredientsSlice.selectors.selectIngredientsError(state)).toEqual(
      null
    );
  });

  it('should select ingredients by types', () => {
    const result =
      ingredientsSlice.selectors.selectIngredientsByAllTypes(state);
    expect(result.buns).toEqual(
      mockIngredients.filter((item) => item.type === 'bun')
    );
    expect(result.mains).toEqual(
      mockIngredients.filter((item) => item.type === 'main')
    );
    expect(result.sauces).toEqual(
      mockIngredients.filter((item) => item.type === 'sauce')
    );
  });
});
