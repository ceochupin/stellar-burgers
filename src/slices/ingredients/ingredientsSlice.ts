import { createSlice } from '@reduxjs/toolkit';
import { TIngredient, TTabMode } from '@utils-types';
import { fetchIngredients } from './ingredientsActions';

interface IngredientsState {
  items: TIngredient[];
  categories: Record<TTabMode, TIngredient[]>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  categories: {
    bun: [],
    sauce: [],
    main: []
  },
  status: 'idle',
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectAllIngredients: (state) => state.items,
    selectIngredientsStatus: (state) => state.status,
    selectIngredientsError: (state) => state.error,
    selectIngredientsByCategory: (state) => state.categories
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;

        action.payload.forEach((ingredient) => {
          state.items.push(ingredient);
        });

        (Object.keys(state.categories) as TTabMode[]).forEach((key) => {
          state.categories[key] = action.payload.filter(
            (ingredient) => ingredient.type === key
          );
        });
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.error?.message as string) ?? 'Неизвестная ошибка';
      });
  }
});

export const {
  selectAllIngredients,
  selectIngredientsStatus,
  selectIngredientsError,
  selectIngredientsByCategory
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;
