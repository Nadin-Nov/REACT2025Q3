import { render, screen, fireEvent } from '@testing-library/react';

import {SearchBar} from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnChange = vi.fn();
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
    mockOnSearch.mockClear();
  });

  test('renders input and button', () => {
    render(<SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/type a name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search!/i })).toBeInTheDocument();
  });

  test('input shows value from props', () => {
    render(<SearchBar value="test value" onChange={mockOnChange} onSearch={mockOnSearch} />);
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
  });

  test('calls onChange when input changes', () => {
    render(<SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/type a name/i);
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  test('calls onSearch when form is submitted', () => {
    render(<SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />);
    const form = screen.getByTestId('search-bar');
    fireEvent.submit(form);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
