import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectIngredientsItemsState = (state: RootState) =>
  state.ingredients.items;

export const makeSelectIngredientById = () =>
  createSelector(
    [selectIngredientsItemsState, (_, id: string) => id],
    (items, id) => items.find((item) => item._id === id) || null
  );
