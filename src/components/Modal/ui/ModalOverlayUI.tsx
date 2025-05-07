import styles from './ModalOverlayUI.module.css';
import React from 'react';

export const ModalOverlayUI = ({
  onClick
}: {
  onClick: () => void;
}): JSX.Element => <div className={styles.overlay} onClick={onClick} />;
