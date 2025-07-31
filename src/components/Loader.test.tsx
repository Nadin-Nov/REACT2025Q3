import { render, screen } from '@testing-library/react';

import { Loader } from './Loader';

describe('Loader', () => {
  it('renders loading spinner and text', () => {
    render(<Loader />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
