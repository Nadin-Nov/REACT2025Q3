import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import type { FormTileData } from './FormTiles';
import { FormTiles } from './FormTiles';

const mockData: FormTileData[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    gender: 'Male',
    country: 'USA',
    acceptTnC: true,
    picture: 'john.png',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    gender: 'Female',
    country: 'Canada',
    acceptTnC: false,
  },
];

describe('FormTiles', () => {
  it('renders all tiles correctly', () => {
    render(<FormTiles data={mockData} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();

    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Email: jane@example.com')).toBeInTheDocument();

    expect(screen.getByText('Age: 30')).toBeInTheDocument();
    expect(screen.getByText('Age: 25')).toBeInTheDocument();

    expect(screen.getByText('Gender: Male')).toBeInTheDocument();
    expect(screen.getByText('Gender: Female')).toBeInTheDocument();

    expect(screen.getByText('Country: USA')).toBeInTheDocument();
    expect(screen.getByText('Country: Canada')).toBeInTheDocument();

    expect(screen.getByText('Accepted T&C: Yes')).toBeInTheDocument();
    expect(screen.getByText('Accepted T&C: No')).toBeInTheDocument();

    expect(screen.getByAltText('John Doe')).toHaveAttribute('src', 'john.png');
    expect(screen.queryByAltText('Jane Smith')).toBeNull();
  });

  it('applies "newTile" class to the last tile', () => {
    render(<FormTiles data={mockData} />);
    const tiles = screen.getAllByTestId('form-tile');
    expect(tiles[tiles.length - 1].className).toMatch(/newTile/);
  });
});
