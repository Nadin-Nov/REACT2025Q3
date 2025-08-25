import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { Modal } from './Modal';

beforeEach(() => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  HTMLDialogElement.prototype.showModal = vi.fn(function (
    this: HTMLDialogElement
  ) {
    this.setAttribute('open', 'true');
    this.focus();
  });

  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute('open');
  });
});

afterEach(() => {
  document.body.innerHTML = '';
  vi.restoreAllMocks();
});

describe('Modal component', () => {
  it('should render children when open', () => {
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} ariaLabel="Test modal">
        <div>Modal content</div>
      </Modal>
    );

    const dialog = screen.getByLabelText(/Test modal/i);
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Test modal');
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    const onClose = vi.fn();
    const { queryByLabelText } = render(
      <Modal open={false} onClose={onClose} ariaLabel="Hidden modal">
        <div>Hidden content</div>
      </Modal>
    );

    expect(queryByLabelText(/Hidden modal/i)).not.toBeInTheDocument();
  });

  it('should call onClose when ESC key is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} ariaLabel="ESC modal">
        <div>Content</div>
      </Modal>
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when clicking on overlay', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} ariaLabel="Overlay modal">
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);

    const content = screen.getByTestId('modal-content');
    await user.click(content);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when Close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open={true} onClose={onClose} ariaLabel="Closable modal">
        <div>Content</div>
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
