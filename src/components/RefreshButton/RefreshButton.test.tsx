import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as reactRedux from 'react-redux';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { itemsApi } from '../../api/itemsApi';
import { store } from '../../store';

import { RefreshButton } from './RefreshButton';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual<typeof reactRedux>('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

describe('RefreshButton', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('should dispatch invalidateTags action on click', async () => {
    const mockDispatch = vi.fn();

    const { useDispatch } = await import('react-redux');
    (useDispatch as unknown as ReturnType<typeof vi.fn>).mockReturnValue(
      mockDispatch
    );

    const user = userEvent.setup();

    render(
      <reactRedux.Provider store={store}>
        <RefreshButton />
      </reactRedux.Provider>
    );

    const button = screen.getByRole('button', { name: /^refresh$/i });
    await user.click(button);

    expect(mockDispatch).toHaveBeenCalledWith(
      itemsApi.util.invalidateTags(['Characters', 'Character'])
    );
  });
});
