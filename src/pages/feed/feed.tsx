import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { selectFeedInfoItems } from '../../slices/feed-info/feed-info-selectors';
import { getFeedInfo } from '../../slices/feed-info/feed-info-actions';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectFeedInfoItems);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedInfo());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedInfo())} />
  );
};
