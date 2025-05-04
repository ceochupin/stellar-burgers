import { useMemo } from 'react';
import { Preloader } from '@ui';
import { IngredientDetailsUI } from '@ui';
import { useSelector } from '@store';
import { makeSelectIngredientById } from '@slices';
import { useParams } from 'react-router-dom';

export const IngredientDetails = (): JSX.Element => {
  const { id } = useParams();

  // TODO: Придумать заглушку вывода ошибки
  if (!id) {
    return <Preloader />;
  }

  const selectIngredientById = useMemo(() => makeSelectIngredientById(), []);

  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
