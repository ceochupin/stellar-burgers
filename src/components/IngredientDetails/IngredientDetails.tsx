import React from 'react';
import { Preloader } from '@components';
import { IngredientDetailsUI } from './ui/IngredientDetailsUI';
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
