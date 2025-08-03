import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import type { Mock } from 'vitest';
import { vi, describe, it, expect, afterEach, beforeEach } from 'vitest';

import { ResultCard } from './ResultCard';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams('foo=bar')],
  };
});

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

type RootState = {
  selectedItems: {
    items: unknown[];
  };
};

describe('ResultCard', () => {
  const id = 42;
  const currentPage = 3;
  const name = 'Rick Sanchez';
  const description = 'Scientist and adventurer';
  const image = 'test.png';

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as Mock).mockImplementation(
      (selector: (state: RootState) => unknown): unknown =>
        selector({
          selectedItems: { items: [] },
        } as RootState)
    );
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

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
    renderCard({ image });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', image);
    expect(img).toHaveAttribute('alt', name);
  });

  it('should dispatch toggleSelect action on checkbox change', async () => {
    renderCard({ image });

    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'selectedItems/toggleSelect',
      payload: {
        id,
        name,
        description,
        image,
        detailsUrl: `/${currentPage}/${id}`,
      },
    });
  });
});
