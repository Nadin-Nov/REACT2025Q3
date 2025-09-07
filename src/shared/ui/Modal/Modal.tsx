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

  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
      dialogRef.current?.showModal();
      dialogRef.current?.focus();

      const dialog = dialogRef.current;
      if (dialog) {
        const focusableSelectors = [
          'a[href]',
          'button:not([disabled])',
          'input:not([disabled])',
          'select:not([disabled])',
          'textarea:not([disabled])',
          '[tabindex]:not([tabindex="-1"])',
        ];
        const focusableEls = Array.from(
          dialog.querySelectorAll<HTMLElement>(focusableSelectors.join(','))
        );
        firstFocusableRef.current = focusableEls[0] || null;
        lastFocusableRef.current =
          focusableEls[focusableEls.length - 1] || null;
      }
    } else {
      dialogRef.current?.close();
      previousActiveElementRef.current?.focus();
      firstFocusableRef.current = null;
      lastFocusableRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown as EventListener);
      return () =>
        document.removeEventListener('keydown', handleKeyDown as EventListener);
    }
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (!firstFocusableRef.current || !lastFocusableRef.current) {
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          e.preventDefault();
          lastFocusableRef.current.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          e.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab as EventListener);
    return () =>
      document.removeEventListener('keydown', handleTab as EventListener);
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
