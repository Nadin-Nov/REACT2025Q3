import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from './SearchBar';

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

  test('calls onChange when input changes', async () => {
    render(<SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText(/type a name/i);
    await userEvent.type(input, 'abc');
    expect(mockOnChange).toHaveBeenCalledTimes(3);
  });

  test('calls onSearch when form is submitted', async () => {
    render(<SearchBar value="" onChange={mockOnChange} onSearch={mockOnSearch} />);
    const button = screen.getByRole('button', { name: /search!/i });
    await userEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
