import React from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from './ui/FeedInfoUI';
import { useSelector } from '@redux-store';
import {
  selectFeedOrders,
  selectFeedOrdersTotal,
  selectFeedOrdersTotalToday
} from '@slices';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo = (): JSX.Element => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedOrdersTotal);
  const totalToday = useSelector(selectFeedOrdersTotalToday);

  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
