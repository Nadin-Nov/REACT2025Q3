import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { RadioField } from './RadioField';

const options = ['Male', 'Female', 'Other'];

describe('RadioField', () => {
  it('renders label and all radio options', () => {
    render(<RadioField name="gender" label="Gender" options={options} />);
    options.forEach((opt) => {
      const radio = screen.getByRole('radio', { name: opt });
      expect(radio).toBeInTheDocument();
      expect((radio as HTMLInputElement).type).toBe('radio');
      expect((radio as HTMLInputElement).checked).toBe(false);
    });
  });

  it('calls onChange in controlled mode', () => {
    const handleChange = vi.fn();
    render(
      <RadioField
        name="gender"
        label="Gender"
        options={options}
        value="Male"
        onChange={handleChange}
      />
    );

    const radio = screen.getByRole('radio', { name: 'Female' });
    fireEvent.click(radio);
    expect(handleChange).toHaveBeenCalledWith('Female');
  });

  it('sets defaultChecked in uncontrolled mode', () => {
    render(
      <RadioField
        name="gender"
        label="Gender"
        options={options}
        defaultValue="Other"
        uncontrolled
      />
    );

    const radio = screen.getByRole('radio', { name: 'Other' });
    expect((radio as HTMLInputElement).checked).toBe(true);
  });

  it('displays error messages', () => {
    const errors = ['Required field', 'Invalid selection'];
    render(
      <RadioField
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
