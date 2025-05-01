// TODO: Типизировать createAsyncThunk

import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getBurgerIngredients = createAsyncThunk(
  'burgerIngredients/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getIngredientsApi();
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || 'Не удалось получить ингридиенты'
      );
    }
  }
);
