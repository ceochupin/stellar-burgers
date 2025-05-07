import React, { memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from './ui/ModalUI';

// const modalRoot = document.getElementById('modals');

// export const Modal = memo(
//   ({ title, onClose, children }: TModalProps): JSX.Element => {
//     useEffect(() => {
//       const handleEsc = (e: KeyboardEvent) => {
//         e.key === 'Escape' && onClose();
//       };

//       document.addEventListener('keydown', handleEsc);
//       return () => {
//         document.removeEventListener('keydown', handleEsc);
//       };
//     }, [onClose]);

//     return ReactDOM.createPortal(
//       <ModalUI title={title} onClose={onClose}>
//         {children}
//       </ModalUI>,
//       modalRoot as HTMLDivElement
//     );
//   }
// );

export const Modal = memo(
  ({ title, onClose, children }: TModalProps): JSX.Element | null => {
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

    useEffect(() => {
      const root = document.getElementById('modals');
      if (!root) {
        const newRoot = document.createElement('div');
        newRoot.id = 'modals';
        document.body.appendChild(newRoot);
        setModalRoot(newRoot);
      } else {
        setModalRoot(root);
      }

      const handleEsc = (e: KeyboardEvent) => {
        e.key === 'Escape' && onClose();
      };
      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      };
    }, [onClose]);

    if (!modalRoot) return null;

    return ReactDOM.createPortal(
      <ModalUI title={title} onClose={onClose}>
        {children}
      </ModalUI>,
      modalRoot
    );
  }
);
