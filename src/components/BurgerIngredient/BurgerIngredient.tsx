import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '@store';
import { addIngredient } from '@slices';

export const BurgerIngredient = memo(
  ({ ingredient, count }: TBurgerIngredientProps): JSX.Element => {
    const location = useLocation();
    const dispatch = useDispatch();

    const locationState = { background: location };

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={locationState}
        handleAdd={handleAdd}
      />
    );
  }
);
