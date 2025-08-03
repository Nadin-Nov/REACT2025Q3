import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { ResultCard } from './ResultCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('foo=bar')],
  };
});

describe('ResultCard', () => {
  const id = 42;
  const currentPage = 3;
  const name = 'Rick Sanchez';
  const description = 'Scientist and adventurer';

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderCard = (props = {}) =>
    render(
      <MemoryRouter>
        <ResultCard
          id={id}
          currentPage={currentPage}
          name={name}
          description={description}
          {...props}
        />
      </MemoryRouter>
    );

  it('should render name and description', () => {
    renderCard();

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(name);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should navigate on click', async () => {
    renderCard();

    await userEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });

  it('should navigate on Enter key press', async () => {
    renderCard();

    const button = screen.getByRole('button');
    button.focus();

    await userEvent.keyboard('{Enter}');

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });

  it('should navigate on Space key press', async () => {
    renderCard();

    const button = screen.getByRole('button');
    button.focus();

    await userEvent.keyboard(' ');

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });

  it('should not render image when image prop is missing', () => {
    renderCard();

    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render image when image prop is provided', () => {
    renderCard({ image: 'test.png' });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'test.png');
    expect(img).toHaveAttribute('alt', name);
  });
});
