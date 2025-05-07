import { createSelector } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '@utils-types';
import { selectIngredientsItems } from '../ingredients';
import { selectOrderByNumber } from './orders-slice';

// селектор детального заказа
// const selectIngredientsItemsState = (state: RootState) =>
//   state.ingredients.items;

// const selectOrderByNumber = (state: RootState) => state.orders.orderByNumber;

// TODO: вынести в константу
const maxIngredients = 6;

// селектор карточки заказа в ленте
export const selectOrderInfo = (order: TOrder) =>
  createSelector([selectIngredientsItems], (ingredients) => {
    if (!ingredients.length) return null;

    const ingredientsMap = new Map(ingredients.map((ing) => [ing._id, ing]));

    const ingredientsInfo = order.ingredients
      .map((item) => ingredientsMap.get(item))
      .filter(Boolean) as TIngredient[];

    if (!ingredientsInfo.length) return null;

    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow: ingredientsInfo.slice(0, maxIngredients),
      remains: Math.max(ingredientsInfo.length - maxIngredients, 0),
      total: ingredientsInfo.reduce((acc, item) => acc + item.price, 0),
      date: new Date(order.createdAt)
    };
  });

// селектор детального заказа
export const selectOrderDetails = createSelector(
  [selectOrderByNumber, selectIngredientsItems],
  (orderData, ingredients) => {
    if (!orderData || !ingredients.length || !orderData.ingredients)
      return null;

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
  }
);
