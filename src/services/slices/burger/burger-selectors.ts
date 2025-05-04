// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store';
import { TConstructorIngredient } from '@utils-types';

const selectBurgerState = (state: RootState) => state.burger;

export const selectBurgerBun = createSelector(
  [selectBurgerState],
  (burgerState) => burgerState.bun
);

export const selectBurgerIngredients = createSelector(
  [selectBurgerState],
  (burgerState) => burgerState.ingredients
);

export const selectBurgerItems = createSelector(
  [selectBurgerBun, selectBurgerIngredients],
  (
    bun: TConstructorIngredient | null,
    ingredients: TConstructorIngredient[] | []
  ) => ({
    bun,
    ingredients
  })
);

export const selectBurgerTotalPrice = createSelector(
  [selectBurgerBun, selectBurgerIngredients],
  (bun, ingredients) => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }
);

export const selectBurgerItemsIds = createSelector(
  [selectBurgerBun, selectBurgerIngredients],
  (bun, ingredients) => {
    const ingredientsIds = ingredients.map((item) => item._id);
    const bunId = bun ? [bun._id] : [];

    return [...bunId, ...ingredientsIds, ...bunId];
  }
);
