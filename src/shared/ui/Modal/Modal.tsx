import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  labelledById?: string;
};

export const Modal: FC<ModalProps> = ({
  open,
  onClose,
  children,
  ariaLabel,
  labelledById,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
      dialogRef.current?.focus();
    } else {
      dialogRef.current?.close();
      previousActiveElementRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];
    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
    );

    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOverlayClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal="true"
      {...(labelledById
        ? { 'aria-labelledby': labelledById }
        : { 'aria-label': ariaLabel || 'Modal window' })}
    >
      <div
        className={styles.overlay}
        role="presentation"
        tabIndex={-1}
        data-testid="modal-overlay"
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
      </div>
    </dialog>,
    document.getElementById('modal-root')!
  );
};
