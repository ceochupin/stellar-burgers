import React, { useEffect } from 'react';
import { Preloader } from '@components';
import { OrderInfoUI } from './ui/OrderInfoUI';
import { useDispatch, useSelector } from '@store';
import { useParams } from 'react-router-dom';
import {
  clearOrderByNumber,
  getOrderByNumber,
  selectOrderDetails
} from '@slices';

export const OrderInfo = (): JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams();

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));

    return () => {
      dispatch(clearOrderByNumber());
    };
  }, [dispatch, number]);

  const orderInfo = useSelector(selectOrderDetails);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
