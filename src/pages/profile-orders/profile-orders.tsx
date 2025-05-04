import { useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectOrdersListItems } from '../../services/slices/orders-list/orders-list-selectors';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersListItems);

  return <ProfileOrdersUI orders={orders} />;
};
