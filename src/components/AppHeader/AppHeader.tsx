import { AppHeaderUI } from './ui/AppHeaderUI';
import { useSelector } from '@redux-store';
import { selectUserData } from '@slices';

export const AppHeader = (): JSX.Element => {
  const userName = useSelector(selectUserData)?.name || '';

  return <AppHeaderUI userName={userName} />;
};
