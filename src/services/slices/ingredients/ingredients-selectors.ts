import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';

// поиск ингредиента по id
const selectIngredientsItemsState = (state: RootState) =>
  state.ingredients.items;

export const selectIngredientById = (id: string) =>
  createSelector(
    [selectIngredientsItemsState],
    (ingredients) => ingredients.find((item) => item._id === id) || null
  );

// каунтеры для ингредиентов
const selectBurgerBun = (state: RootState) => state.burger.bun;
const selectBurgerIngredients = (state: RootState) => state.burger.ingredients;

export const selectIngredientsCounters = createSelector(
  [selectBurgerBun, selectBurgerIngredients],
  (bun, ingredients) => {
    const counters: { [key: string]: number } = {};

    ingredients.forEach((ingredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    if (bun) counters[bun._id] = 2;

    return counters;
  }
);
