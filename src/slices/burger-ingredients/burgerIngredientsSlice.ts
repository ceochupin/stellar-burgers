import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getBurgerIngredients } from './burgerIngredientsActions';

interface IBurgerIngredientsState {
  items: TIngredient[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IBurgerIngredientsState = {
  items: [],
  status: 'idle',
  error: null
};

const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsStatus: (state) => state.status,
    selectIngredientsError: (state) => state.error,
    selectIngredientById: (state, id: string) =>
      state.items.find((item) => item._id === id) || null,
    selectIngredientsByAllTypes: createSelector(
      [(state: IBurgerIngredientsState) => state.items],
      (items) => ({
        buns: items.filter((item) => item.type === 'bun'),
        mains: items.filter((item) => item.type === 'main'),
        sauces: items.filter((item) => item.type === 'sauce')
      })
    )
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBurgerIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getBurgerIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.status = 'succeeded';
          state.items = action.payload;
        }
      )
      .addCase(getBurgerIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error.message as string) || 'Неизвестная ошибка';
      });
  }
});

export const {
  selectIngredientsStatus,
  selectIngredientsError,
  selectIngredientById,
  selectIngredientsByAllTypes
} = burgerIngredientsSlice.selectors;

export default burgerIngredientsSlice.reducer;
