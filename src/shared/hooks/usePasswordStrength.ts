import type { ChangeEvent } from 'react';
import { useState } from 'react';

import { calculatePasswordStrength } from '../utils/formHelpers';

export const usePasswordStrength = () => {
  const [strength, setStrength] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStrength(calculatePasswordStrength(e.target.value));
  };

  return { strength, onChange };
};
