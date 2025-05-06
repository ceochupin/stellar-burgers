import { createSelector, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredients } from '@slices';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsItems: (state) => state.items,
    selectIngredientsIsLoading: (state) => state.isLoading,
    selectIngredientsError: (state) => state.error,

    selectIngredientsByAllTypes: createSelector(
      [(state: TIngredientsState) => state.items],
      (items: TIngredient[]) => ({
        buns: items.filter((item) => item.type === 'bun'),
        mains: items.filter((item) => item.type === 'main'),
        sauces: items.filter((item) => item.type === 'sauce')
      })
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ингредиентов';
      });
  }
});

export const {
  selectIngredientsItems,
  selectIngredientsIsLoading,
  selectIngredientsError,
  selectIngredientsByAllTypes
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
