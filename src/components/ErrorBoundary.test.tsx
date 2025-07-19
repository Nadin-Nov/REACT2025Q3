import { render, screen } from '@testing-library/react';
import React from 'react';

import ErrorBoundary from './ErrorBoundary';

class ProblemChild extends React.Component {
  componentDidMount() {
    throw new Error('Test error');
  }
  render() {
    return <div>Problem</div>;
  }
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">thats ok</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders fallback UI - child throws', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    const fallback = screen.getByTestId('error-boundary');
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveTextContent(/uh oh/i);
  });
});
