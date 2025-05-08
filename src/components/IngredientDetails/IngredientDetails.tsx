import React, { memo, useMemo } from 'react';
import { Preloader } from '@components';
import { IngredientDetailsUI } from './ui/IngredientDetailsUI';
import { useParams } from 'react-router-dom';
import { useSelector } from '@redux-store';
import { selectIngredientsItems } from '@slices';

export const IngredientDetails = memo((): JSX.Element => {
  const { id } = useParams();
  const ingredients = useSelector(selectIngredientsItems);

  const ingredientData = useMemo(
    () => ingredients.find((ing) => ing._id === id),
    [ingredients, id]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
});
