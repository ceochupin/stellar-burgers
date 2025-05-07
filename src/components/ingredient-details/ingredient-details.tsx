import React from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { selectIngredientById } from '@slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails = (): JSX.Element => {
  const { id } = useParams();

  const ingredientData = useSelector(selectIngredientById(id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
