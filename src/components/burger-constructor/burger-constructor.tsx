import { FC } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '@store';
import {
  selectConstructorItems,
  selectConstructorTotalPrice
} from '../../slices/burger-constructor/burger-constructor-selectors';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const price = useSelector(selectConstructorTotalPrice);

  const orderRequest = false;
  const orderModalData = null;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
  };

  const closeOrderModal = () => {};

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
