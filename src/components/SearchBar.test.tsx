import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders input with correct placeholder', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />);
    expect(screen.getByPlaceholderText('Type a name…')).toBeInTheDocument();
  });
});
