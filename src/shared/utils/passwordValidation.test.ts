import { describe, it, expect } from 'vitest';

import { validatePassword } from './passwordValidation';

describe('validatePassword', () => {
  it('should return error if password has no digit', () => {
    const errors = validatePassword('Password!');
    expect(errors).toContain('Password must contain at least one digit');
  });

  it('should return error if password has no uppercase letter', () => {
    const errors = validatePassword('password1!');
    expect(errors).toContain(
      'Password must contain at least one uppercase letter'
    );
  });

  it('should return error if password has no lowercase letter', () => {
    const errors = validatePassword('PASSWORD1!');
    expect(errors).toContain(
      'Password must contain at least one lowercase letter'
    );
  });

  it('should return error if password has no special character', () => {
    const errors = validatePassword('Password1');
    expect(errors).toContain(
      'Password must contain at least one special character'
    );
  });

  it('should return empty array if password meets all criteria', () => {
    const errors = validatePassword('Password1!');
    expect(errors).toEqual([]);
  });

  it('should return multiple errors if several rules fail', () => {
    const errors = validatePassword('pass');
    expect(errors).toContain('Password must contain at least one digit');
    expect(errors).toContain(
      'Password must contain at least one uppercase letter'
    );
    expect(errors).toContain(
      'Password must contain at least one special character'
    );
  });
});
