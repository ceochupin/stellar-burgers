import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { OrderCardUI } from './ui/OrderCardUI';
import { useSelector } from '@store';
import { selectOrderInfo } from '@slices';

// TODO: вынести в константу
const maxIngredients = 6;

export const OrderCard = memo(
  ({ order }: OrderCardProps): JSX.Element | null => {
    const location = useLocation();
    const locationState = { background: location };

    const orderInfo = useSelector(selectOrderInfo(order));

    if (!orderInfo) return null;

    return (
      <OrderCardUI
        orderInfo={orderInfo}
        maxIngredients={maxIngredients}
        locationState={locationState}
      />
    );
  }
);
