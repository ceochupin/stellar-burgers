import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchIngredients = createAsyncThunk(
//   'ingredients/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       return await getIngredientsApi();
//     } catch (error) {
//       return rejectWithValue(
//         (error as Error).message || 'Не удалось получить ингридиенты'
//       );
//     }
//   }
// );

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => getIngredientsApi()
);
