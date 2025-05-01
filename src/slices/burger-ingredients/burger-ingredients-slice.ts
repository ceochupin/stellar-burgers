// TODO: Вынести интерфейс в локальные типы слайса для селекторов

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getBurgerIngredients } from './burger-ingredients-actions';

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

export default burgerIngredientsSlice.reducer;
