import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, expect, beforeEach, it } from 'vitest';

import { SearchBar } from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSearch.mockClear();
  });

  it('should render input and button', () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />
    );
    expect(screen.getByPlaceholderText(/type a name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /search!/i })
    ).toBeInTheDocument();
  });

  it('should show value from props in input', () => {
    render(
      <SearchBar
        value="test value"
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  it('should call onChange when input changes', async () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />
    );
    const input = screen.getByPlaceholderText(/type a name/i);
    await userEvent.type(input, 'abc');
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  it('should call onSearch when form is submitted by clicking the button', async () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />
    );
    const button = screen.getByRole('button', { name: /search!/i });
    await userEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('should call onSearch when form is submitted by pressing Enter in the input', async () => {
    render(
      <SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />
    );
    const input = screen.getByPlaceholderText(/type a name/i);
    await userEvent.type(input, '{Enter}');
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
