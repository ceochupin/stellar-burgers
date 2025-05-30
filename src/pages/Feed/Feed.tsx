import { Preloader } from '@components';
import { FeedUI } from './ui/FeedUI';
import { TOrder } from '@utils-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '@redux-store';
import { getFeedOrders, selectFeedOrders } from '@slices';

export const Feed = (): JSX.Element => {
  const orders: TOrder[] = useSelector(selectFeedOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedOrders());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedOrders())} />
  );
};
