import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from './BurgerIngredientUI.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';

export const BurgerIngredientUI = memo(
  ({
    ingredient,
    count,
    handleAdd,
    locationState
  }: TBurgerIngredientUIProps): JSX.Element => {
    const { image, price, name, _id } = ingredient;

    return (
      <li className={styles.container} data-cy={'ingredient'}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState}
        >
          {count && <Counter count={count} />}
          <img
            className={styles.img}
            src={image}
            alt={name || 'картинка ингредиента'}
          />
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Добавить'
          onClick={handleAdd}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
