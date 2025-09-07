import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { SelectField } from './SelectField';

const options = ['Male', 'Female', 'Other'];

describe('SelectField', () => {
  it('should renders label and options', () => {
    render(
      <SelectField id="gender" name="gender" label="Gender" options={options} />
    );

    expect(screen.getByLabelText(/Gender/i)).toBeInTheDocument();
    options.forEach((opt) => {
      expect(screen.getByRole('option', { name: opt })).toBeInTheDocument();
    });
  });

  it('should calls onChange in controlled mode', () => {
    const handleChange = vi.fn();
    render(
      <SelectField
        id="gender"
        name="gender"
        label="Gender"
        options={options}
        value="Male"
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Female' },
    });
    expect(handleChange).toHaveBeenCalledWith('Female');
  });

  it('should displays error messages', () => {
    const errors = ['Required field', 'Invalid selection'];
    render(
      <SelectField
        id="gender"
        name="gender"
        label="Gender"
        options={options}
        errors={errors}
      />
    );

    errors.forEach((err) => {
      expect(screen.getByText(err)).toBeInTheDocument();
    });
  });
});
