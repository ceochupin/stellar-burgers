import React, { useMemo } from 'react';

import { BurgerConstructorUI } from './ui/BurgerConstructorUI';
import { useDispatch, useSelector } from '@redux-store';
import {
  clearConstructor,
  clearNewOrder,
  createNewOrder,
  selectBurgerItems,
  selectNewOrder,
  selectNewOrderStatus,
  selectUserData,
  stopIsLoading
} from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';

export const BurgerConstructor = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(selectUserData);
  const constructorItems = useSelector(selectBurgerItems);
  const orderRequest = useSelector(selectNewOrderStatus);
  const orderModalData = useSelector(selectNewOrder);

  const orderItemsIds = useMemo(() => {
    const ingredientsIds = constructorItems.ingredients.map((item) => item._id);
    const bunId = constructorItems.bun ? [constructorItems.bun._id] : [];

    return [...bunId, ...ingredientsIds, ...bunId];
  }, [constructorItems]);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

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
