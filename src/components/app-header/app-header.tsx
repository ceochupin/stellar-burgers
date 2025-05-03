import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { selectUserData } from '../../slices/user/user-selectors';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserData)?.name || '';

  return <AppHeaderUI userName={userName} />;
};
