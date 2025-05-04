import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick
}: {
  onClick: () => void;
}): JSX.Element => <div className={styles.overlay} onClick={onClick} />;
