import { render, screen, fireEvent } from '@testing-library/react';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  const onPageChange = vi.fn();

  beforeEach(() => {
    onPageChange.mockClear();
  });

  it('renders current page and total pages', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText(/page 2 of 5/i)).toBeInTheDocument();
  });

  it('disables Prev button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText(/← prev/i)).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);
    expect(screen.getByText(/next →/i)).toBeDisabled();
  });

  it('calls onPageChange with currentPage - 1 when Prev clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    const prevButton = screen.getByText(/← prev/i);
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when Next clicked', () => {
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    const nextButton = screen.getByText(/next →/i);
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
