// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectIngredientsItems = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.items
);

export const selectIngredientsStatus = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.loading
);

export const selectIngredientsError = createSelector(
  [selectIngredientsState],
  (ingredientsState) => ingredientsState.error
);

export const selectIngredientsByAllTypes = createSelector(
  [selectIngredientsItems],
  (items) => ({
    buns: items.filter((item) => item.type === 'bun'),
    mains: items.filter((item) => item.type === 'main'),
    sauces: items.filter((item) => item.type === 'sauce')
  })
);

export const makeSelectIngredientById = () =>
  createSelector(
    [selectIngredientsItems, (_, id: string) => id],
    (items, id) => items.find((item) => item._id === id) || null
  );
