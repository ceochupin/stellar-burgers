import { useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { selectOrdersListItems } from '@slices';

export const ProfileOrders = (): JSX.Element => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersListItems);

  return <ProfileOrdersUI orders={orders} />;
};
