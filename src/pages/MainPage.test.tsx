import { render, screen } from '@testing-library/react';

import MainPage from '../pages/MainPage';

vi.mock('../components/Header', () => {
  const HeaderMock = () => <div data-testid="header" />;
  HeaderMock.displayName = 'Header';
  return { default: HeaderMock };
});

vi.mock('../components/SearchSection', () => {
  const SearchSectionMock = () => <div data-testid="search-section" />;
  SearchSectionMock.displayName = 'SearchSection';
  return { default: SearchSectionMock };
});

vi.mock('../components/ErrorButton', () => {
  const ErrorButtonMock = () => <button data-testid="error-button">Error</button>;
  ErrorButtonMock.displayName = 'ErrorButton';
  return { default: ErrorButtonMock };
});

describe('MainPage', () => {
  it('renders main container and child components', () => {
    render(<MainPage />);

    const mainContainer = screen.getByTestId('main-page');
    expect(mainContainer).toBeInTheDocument();

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('search-section')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });
});
