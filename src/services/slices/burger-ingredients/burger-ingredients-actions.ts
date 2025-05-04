// TODO: Типизировать createAsyncThunk

import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBurgerIngredients = createAsyncThunk(
  'burgerIngredients/getAll',
  async () => getIngredientsApi()
);
