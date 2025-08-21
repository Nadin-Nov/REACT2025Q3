import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const Modal: FC<ModalProps> = ({ open, onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      overlayRef.current?.focus();
    } else {
      previousActiveElementRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      role="button"
      tabIndex={0}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
    >
      <div className={styles.content}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};
