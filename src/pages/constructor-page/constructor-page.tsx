import { useSelector } from '@store';
import { selectIngredientsStatus } from '@slices';
import { ConstructorPageUI } from '@ui-pages';

export const ConstructorPage = (): JSX.Element => {
  const isIngredientsLoading = useSelector(selectIngredientsStatus);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
