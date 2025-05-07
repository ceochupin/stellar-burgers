import React from 'react';
import { OrderStatusUIProps } from './type';

export const OrderStatusUI = ({
  textStyle,
  text
}: OrderStatusUIProps): JSX.Element => (
  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
);
