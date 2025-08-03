import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, vi, describe, it } from 'vitest';

import { MainPage } from '../pages/MainPage';

vi.mock('../components/SearchSection', () => {
  const SearchSectionMock = () => <div data-testid="search-section" />;
  SearchSectionMock.displayName = 'SearchSection';
  return { SearchSection: SearchSectionMock };
});

describe('MainPage', () => {
  it('renders main container and SearchSection component', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MainPage />
      </MemoryRouter>
    );

    const mainContainer = screen.getByTestId('main-page');
    expect(mainContainer).toBeInTheDocument();

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
  });
});
