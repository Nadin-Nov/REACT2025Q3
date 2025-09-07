import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { JSX } from 'react/jsx-runtime';
import { Provider } from 'react-redux';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { countryReducer } from '../../../app/store/countrySlice';
import { formsReducer } from '../../../app/store/formsSlice';
import type { UncontrolledFormData } from '../types';

import { UncontrolledForm } from './UncontrolledForm';

vi.mock('../../../shared/utils/formHelpers', async () => {
  const actual = (await vi.importActual(
    '../../../shared/utils/formHelpers'
  )) as unknown as {
    fileToBase64: (file: File) => Promise<string>;
    parseUncontrolledForm: (form: HTMLFormElement) => Promise<{
      data: UncontrolledFormData;
      errors: null | Record<string, string[]>;
    }>;
  };

  return {
    ...actual,
    fileToBase64: vi.fn(() => Promise.resolve('mocked-base64')),
    parseUncontrolledForm: vi.fn((form: HTMLFormElement) => {
      const elements = form.elements as unknown as Record<
        string,
        HTMLInputElement | HTMLSelectElement
      >;

      return Promise.resolve({
        data: {
          name: elements['name']?.value || '',
          email: elements['email']?.value || '',
          age: Number(elements['age']?.value || 0),
          password: elements['password']?.value || '',
          confirmPassword: elements['confirmPassword']?.value || '',
          gender: (elements['gender'] as HTMLInputElement)?.value || '',
          acceptTnC:
            (elements['acceptTnC'] as HTMLInputElement)?.checked || false,
          country: elements['country']?.value || '',
          picture: undefined,
        },
        errors: null,
      });
    }),
  };
});

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

describe('UncontrolledForm', () => {
  let onSubmit: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onSubmit = vi.fn();
  });

  it('should render the form and submit button', () => {
    renderWithProvider(<UncontrolledForm onSubmit={onSubmit} />);

    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();
    expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
  });

  it('should submit form with values', async () => {
    renderWithProvider(<UncontrolledForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByTestId('field-name'), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByTestId('field-email'), {
      target: { value: 'alice@example.com' },
    });
    fireEvent.change(screen.getByTestId('field-age'), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByTestId('field-password'), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByTestId('field-confirmPassword'), {
      target: { value: 'Password123!' },
    });

    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Alice',
          email: 'alice@example.com',
          age: 25,
          password: 'Password123!',
          confirmPassword: 'Password123!',
          gender: '',
          acceptTnC: false,
          country: '',
          picture: undefined,
        })
      );
    });
  });
});
