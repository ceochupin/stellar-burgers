import styles from './preloader.module.css';

import React from 'react';

export const Preloader = (): JSX.Element => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
