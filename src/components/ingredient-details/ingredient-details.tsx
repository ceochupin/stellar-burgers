import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { makeSelectIngredientById } from '../../slices/burger-ingredients/burger-ingredients-selectors';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
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
