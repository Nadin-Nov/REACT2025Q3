import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Loader } from './Loader';

describe('Loader', () => {
  it('should renders loading spinner and text', () => {
    render(<Loader />);

    const status = screen.getByRole('status');
    expect(status).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
