import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { selectFeedInfoItems, getFeedInfo } from '@slices';

export const Feed = (): JSX.Element => {
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
