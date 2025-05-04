import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import {
  clearConstructor,
  clearUserOrderItem,
  createUserOrder,
  selectBurgerItems,
  selectBurgerItemsIds,
  selectBurgerTotalPrice,
  selectUserData,
  selectUserOrdersItem,
  selectUserOrdersStatus
} from '@slices';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectBurgerItems);
  const price = useSelector(selectBurgerTotalPrice);
  const user = useSelector(selectUserData);
  const orderItems = useSelector(selectBurgerItemsIds);

  const orderRequest = useSelector(selectUserOrdersStatus);
  const orderModalData = useSelector(selectUserOrdersItem);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    dispatch(createUserOrder(orderItems));
  };

  const closeOrderModal = () => {
    dispatch(clearUserOrderItem());
    dispatch(clearConstructor());
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
