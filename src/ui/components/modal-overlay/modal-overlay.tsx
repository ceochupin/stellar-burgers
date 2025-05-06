import styles from './modal-overlay.module.css';
import React from 'react';

export const ModalOverlayUI = ({
  onClick
}: {
  onClick: () => void;
}): JSX.Element => <div className={styles.overlay} onClick={onClick} />;
