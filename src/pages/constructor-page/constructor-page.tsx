import { useSelector } from '@store';
import { FC } from 'react';
import { selectIngredientsStatus } from '../../services/slices/burger-ingredients/burger-ingredients-selectors';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(selectIngredientsStatus);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
