import React, { useEffect, useMemo } from 'react';
import { Preloader } from '@components';
import { OrderInfoUI } from './ui/OrderInfoUI';
import { useDispatch, useSelector } from '@redux-store';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';
import {
  clearOrderByNumber,
  getOrderByNumber,
  selectIngredientsItems,
  selectOrderByNumber
} from '@slices';

export const OrderInfo = (): JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams();

  const orderData = useSelector(selectOrderByNumber);
  const ingredients = useSelector(selectIngredientsItems);

  useEffect(() => {
    dispatch(getOrderByNumber(Number(number)));

    return () => {
      dispatch(clearOrderByNumber());
    };
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }
        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
