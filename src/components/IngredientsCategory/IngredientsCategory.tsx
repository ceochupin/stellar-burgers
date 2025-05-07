import React, { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from './ui/IngredientsCategoryUI';
import { useSelector } from '@store';
import {
  selectBurgerBun,
  selectBurgerIngredients,
  selectIngredientsCounters
} from '@slices';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref): JSX.Element => {
  const ingredientsCounters = useSelector(selectIngredientsCounters);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
