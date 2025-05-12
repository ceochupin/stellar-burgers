import React from 'react';
import { useSelector } from '@redux-store';
import { selectIngredientsIsLoading } from '@slices';
import { ConstructorPageUI } from './ui/ConstructorPageUI';

export const ConstructorPage = (): JSX.Element => {
  const isIngredientsLoading = useSelector(selectIngredientsIsLoading);

  return <ConstructorPageUI isIngredientsLoading={isIngredientsLoading} />;
};
