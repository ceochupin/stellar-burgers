import { useDispatch, useSelector } from '@store';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { selectOrdersListItems } from '../../slices/orders-list/orders-list-selectors';
import { getOrdersList } from '../../slices/orders-list/orders-list-actions';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectOrdersListItems);

  const dispatch = useDispatch();

  if (!orders.length) {
    dispatch(getOrdersList());
  }

  return <ProfileOrdersUI orders={orders} />;
};
