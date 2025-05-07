import React, { memo } from 'react';
import { BurgerConstructorElementUI } from './ui/BurgerConstructorElementUI';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@store';
import { moveIngredient, removeIngredient } from '@slices';

export const BurgerConstructorElement = memo(
  ({
    ingredient,
    index,
    totalItems
  }: BurgerConstructorElementProps): JSX.Element => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      if (index < totalItems - 1) {
        dispatch(moveIngredient({ dragIndex: index, hoverIndex: index + 1 }));
      }
    };

    const handleMoveUp = () => {
      if (index > 0) {
        dispatch(moveIngredient({ dragIndex: index, hoverIndex: index - 1 }));
      }
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
