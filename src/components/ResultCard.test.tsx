import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { ResultCard } from './ResultCard';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useSearchParams: () => [new URLSearchParams('foo=bar')],
}));

describe('ResultCard', () => {
  const id = 42;
  const currentPage = 3;
  const name = 'Rick Sanchez';
  const description = 'Scientist and adventurer';

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render name and description', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(name);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('should render image if provided', () => {
    const image = 'https://example.com/rick.png';
    render(
      <MemoryRouter>
        <ResultCard
          id={id}
          currentPage={currentPage}
          name={name}
          description={description}
          image={image}
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img', { name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });

  it('should not render image if not provided', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should navigate with correct URL on click', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );

    const card = screen.getByRole('button');
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });

  it('should navigate on Enter key press', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });

  it('should navigate on Space key press', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );

    const card = screen.getByRole('button');
    fireEvent.keyDown(card, { key: ' ', code: 'Space', charCode: 32 });

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });
});
