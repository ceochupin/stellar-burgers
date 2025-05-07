import styles from './ConstructorPageUI.module.css';

import React from 'react';
import { ConstructorPageUIProps } from './type';
import { Preloader } from '@ui';
import { BurgerIngredients, BurgerConstructor } from '@components';

export const ConstructorPageUI = ({
  isIngredientsLoading
}: ConstructorPageUIProps): JSX.Element => (
  <>
    {isIngredientsLoading ? (
      <Preloader />
    ) : (
      <main className={styles.containerMain}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <div className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    )}
  </>
);
