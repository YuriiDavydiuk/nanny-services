import { type ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import css from './Modal.module.css';

interface ModalProps {
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
}

export default function Modal({ onClose, labelledBy, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog?.showModal();
    dialog?.querySelector('input')?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={css.dialog}
      aria-labelledby={labelledBy}
      onCancel={event => {
        event.preventDefault();
        onClose();
      }}
      onClick={event => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={css.content}>
        <button className={css.close} type="button" aria-label="Close modal" onClick={onClose}>
          <img src="/icons/close.svg" alt="" />
        </button>
        {children}
      </div>
    </dialog>,
    document.body
  );
}
