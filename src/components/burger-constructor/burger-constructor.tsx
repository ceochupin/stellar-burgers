import { BurgerConstructorUI } from '@ui';
import { useSelector } from '@store';
import { selectBurgerItems, selectBurgerTotalPrice } from '@slices';

export const BurgerConstructor = (): JSX.Element => {
  const constructorItems = useSelector(selectBurgerItems);
  const price = useSelector(selectBurgerTotalPrice);

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
