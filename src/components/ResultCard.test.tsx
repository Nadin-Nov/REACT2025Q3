import { render, screen, fireEvent } from '@testing-library/react';
// eslint-disable-next-line import/order
import type * as ReactRouterDom from 'react-router-dom';
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('foo=bar')],
  };
});

import { MemoryRouter } from 'react-router-dom';

import { ResultCard } from './ResultCard';

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

  it('should navigate on click', () => {
    render(
      <MemoryRouter>
        <ResultCard id={id} currentPage={currentPage} name={name} description={description} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button'));

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: `/${currentPage}/${id}`,
      search: 'foo=bar',
    });
  });
});
