// TODO: Поработать с типизацией селекторов

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';
import { TConstructorIngredient } from '@utils-types';

const selectConstructorState = (state: RootState) => state.burgerConstructor;

export const selectConstructorBun = createSelector(
  [selectConstructorState],
  (burgerConstructorState) => burgerConstructorState.bun
);

export const selectConstructorIngredients = createSelector(
  [selectConstructorState],
  (burgerConstructorState) => burgerConstructorState.ingredients
);

export const selectConstructorItems = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (
    bun: TConstructorIngredient | null,
    ingredients: TConstructorIngredient[] | []
  ) => ({
    bun,
    ingredients
  })
);

export const selectConstructorTotalPrice = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum, item) => sum + item.price,
      0
    );
    return bunPrice + ingredientsPrice;
  }
);

export const selectConstructorItemsIds = createSelector(
  [selectConstructorBun, selectConstructorIngredients],
  (bun, ingredients) => {
    const ingredientsIds = ingredients.map((item) => item._id);
    const bunId = bun ? bun._id : null;

    return {
      ingredients: ingredientsIds,
      bun: bunId
    };
  }
);
