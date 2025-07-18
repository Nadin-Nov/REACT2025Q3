import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Loader from './Loader';

describe('Loader', () => {
  it('renders loading spinner and text', () => {
    render(<Loader />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
