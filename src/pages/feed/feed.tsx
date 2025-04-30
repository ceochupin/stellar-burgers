import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedInfoOrders } from '../../slices/feed-info/feed-info-slice';
import { getFeedInfo } from '../../slices/feed-info/feed-info-actions';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedInfoOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedInfo());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeedInfo());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
