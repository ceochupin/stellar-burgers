// TODO: Вынести интерфейс в локальные типы слайса для селекторов

import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getBurgerIngredients } from '@slices';

type TBurgerIngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TBurgerIngredientsState = {
  items: [],
  loading: true,
  error: null
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBurgerIngredients.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
  }
});

export default burgerIngredientsSlice.reducer;
