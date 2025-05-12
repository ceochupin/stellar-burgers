import { useDispatch, useSelector } from '@redux-store';
import { ProfileOrdersUI } from './ui/ProfileOrdersUI';
import { TOrder } from '@utils-types';
import { getUserOrders, selectUserOrders } from '@slices';
import React, { useEffect } from 'react';

export const ProfileOrders = (): JSX.Element => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
