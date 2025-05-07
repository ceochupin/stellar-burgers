import styles from './OrdersListUI.module.css';

import React from 'react';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI = ({
  orderByDate
}: OrdersListUIProps): JSX.Element => (
  <div className={`${styles.content}`}>
    {orderByDate.map((order) => (
      <OrderCard order={order} key={order._id} />
    ))}
  </div>
);
