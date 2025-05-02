import { useSelector } from '../../services/store';
import { FC } from 'react';
import { selectIngredientsStatus } from '../../slices/burger-ingredients/burger-ingredients-selectors';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage: FC = () => {
  const status = useSelector(selectIngredientsStatus);
  const isIngredientsLoading = status === 'loading';

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
