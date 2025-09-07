import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import styles from '../../../features/mainPage/components/form.module.css';

import { InputField } from './InputField';

describe('InputField', () => {
  it('should renders label and input with placeholder', () => {
    render(
      <InputField
        id="name"
        name="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
      />
    );

    const input = screen.getByLabelText('Name:');
    expect(input).toBeInTheDocument();
  });

  it('should displays error messages and applies error class', () => {
    const errors = ['Required', 'Invalid format'];
    render(
      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        errors={errors}
      />
    );

    const input = screen.getByLabelText('Password:');
    expect(input.className).toContain(styles.errorInput);

    errors.forEach((err) => {
      expect(screen.getByText(err)).toBeInTheDocument();
    });
  });

  it('should renders extra content', () => {
    render(
      <InputField
        id="username"
        name="username"
        label="Username"
        type="text"
        extra={<span data-testid="extra">Extra content</span>}
      />
    );

    const extra = screen.getByTestId('extra');
    expect(extra).toBeInTheDocument();
    expect(extra).toHaveTextContent('Extra content');
  });
});
