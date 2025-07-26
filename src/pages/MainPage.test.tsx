import { render, screen } from '@testing-library/react';

import {MainPage} from '../pages/MainPage';

vi.mock('../components/SearchSection', () => {
  const SearchSectionMock = () => <div data-testid="search-section" />;
  SearchSectionMock.displayName = 'SearchSection';
  return { SearchSection: SearchSectionMock };
});

describe('MainPage', () => {
  it('renders main container and child components', () => {
    render(<MainPage />);

    const mainContainer = screen.getByTestId('main-page');
    expect(mainContainer).toBeInTheDocument();

    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });
});
