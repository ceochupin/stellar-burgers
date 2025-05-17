import React, { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { OrderCardUI } from './ui/OrderCardUI';
import { useSelector } from '@redux-store';
import { selectIngredientsItems } from '@slices';
import { MAX_INGREDIENTS } from '@constans';
import { TIngredient } from '@utils-types';

export const OrderCard = memo(
  ({ order }: OrderCardProps): JSX.Element | null => {
    const location = useLocation();

    const ingredients = useSelector(selectIngredientsItems);

    const orderInfo = useMemo(() => {
      if (!ingredients.length) return null;

      const ingredientsInfo = order.ingredients.reduce(
        (acc: TIngredient[], item: string) => {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) return [...acc, ingredient];
          return acc;
        },
        []
      );

      const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

      const ingredientsToShow = ingredientsInfo.slice(0, MAX_INGREDIENTS);

      const remains =
        ingredientsInfo.length > MAX_INGREDIENTS
          ? ingredientsInfo.length - MAX_INGREDIENTS
          : 0;

      const date = new Date(order.createdAt);
      return {
        ...order,
        ingredientsInfo,
        ingredientsToShow,
        remains,
        total,
        date
      };
    }, [order, ingredients]);

    if (!orderInfo) return null;

    return (
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={MAX_INGREDIENTS}
        locationState={{ background: location }}
      />
    );
  }
);
