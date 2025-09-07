import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import type { JSX } from 'react';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { countryReducer } from '../../../app/store/countrySlice';
import { formsReducer } from '../../../app/store/formsSlice';
import { calculatePasswordStrength } from '../../../shared/utils/formHelpers';

import { ControlledForm } from './ControlledForm';

vi.mock('../../../shared/utils/formHelpers', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('mocked-base64')),
  calculatePasswordStrength: vi.fn(() => 'strong'),
}));

const renderWithProvider = (ui: JSX.Element) => {
  const store = configureStore({
    reducer: {
      forms: formsReducer,
      country: countryReducer,
    },
    preloadedState: {
      country: { countries: ['USA', 'Canada'] },
      forms: { uncontrolled: [], hookForm: [] },
    },
  });

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

describe('ControlledForm', () => {
  let onSubmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSubmit = vi.fn();
  });

  it('should updates password field and shows strength', () => {
    renderWithProvider(<ControlledForm onSubmit={onSubmit} />);

    const passwordInput = screen.getByTestId('controlled-password');
    fireEvent.change(passwordInput, { target: { value: 'MySecret123' } });

    expect(calculatePasswordStrength).toHaveBeenCalledWith('MySecret123');

    const strengthIndicators = screen.getAllByText(/strong/i);
    expect(strengthIndicators.length).toBeGreaterThan(0);
  });
});
