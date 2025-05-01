// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';

const selectIngredientsState = (state: RootState) => state.burgerIngredients;

export const selectIngredientsItems = createSelector(
  [selectIngredientsState],
  (burgerIngredientsState) => burgerIngredientsState.items
);

export const selectIngredientsStatus = createSelector(
  [selectIngredientsState],
  (burgerIngredientsState) => burgerIngredientsState.status
);

export const selectIngredientsError = createSelector(
  [selectIngredientsState],
  (burgerIngredientsState) => burgerIngredientsState.error
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
