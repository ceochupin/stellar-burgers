import React from 'react';

import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  clearNewOrder,
  createNewOrder,
  selectBurgerBun,
  selectBurgerIngredients,
  selectBurgerItemsIds,
  selectBurgerTotalPrice,
  selectNewOrder,
  selectNewOrderStatus,
  selectUserData,
  stopIsLoading
} from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);

  const bun = useSelector(selectBurgerBun);
  const ingredients = useSelector(selectBurgerIngredients);
  const price = useSelector(selectBurgerTotalPrice);
  const orderItemsIds = useSelector(selectBurgerItemsIds);

  const constructorItems = { bun, ingredients };

  const orderRequest = useSelector(selectNewOrderStatus);
  const orderModalData = useSelector(selectNewOrder);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(createNewOrder(orderItemsIds));
  };

  const closeOrderModal = () => {
    dispatch(clearNewOrder());
    dispatch(clearConstructor());
    dispatch(stopIsLoading());
  };

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
