import { createSelector } from '@reduxjs/toolkit';
import { selectIngredientsItems } from './ingredients-slice';
import { selectBurgerBun, selectBurgerIngredients } from '../burger';

// поиск ингредиента по id
export const selectIngredientById = (id: string) =>
  createSelector(
    [selectIngredientsItems],
    (ingredients) => ingredients.find((item) => item._id === id) || null
  );

// каунтеры для ингредиентов
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
