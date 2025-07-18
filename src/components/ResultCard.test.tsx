import { render, screen } from '@testing-library/react';

import ResultCard from './ResultCard';

describe('ResultCard', () => {
  const name = 'Rick Sanchez';
  const description = 'Scientist and adventurer';

  it('renders name and description', () => {
    render(<ResultCard name={name} description={description} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(name);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders image if provided', () => {
    const image = 'https://example.com/rick.png';
    render(<ResultCard name={name} description={description} image={image} />);

    const img = screen.getByRole('img', { name });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', image);
  });

  it('does not render image if not provided', () => {
    render(<ResultCard name={name} description={description} />);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
