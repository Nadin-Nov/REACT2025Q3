import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import styles from './PasswordStrengthIndicator.module.css';

describe('PasswordStrengthIndicator', () => {
  const strengths = ['Weak', 'Medium', 'Strong'];

  strengths.forEach((level) => {
    it(`renders strength level "${level}" with correct class`, () => {
      render(<PasswordStrengthIndicator strength={level} />);

      const text = screen.getByText(level);
      expect(text).toBeInTheDocument();
      expect(text).toHaveClass(styles[level.toLowerCase()]);
    });
  });
});
