export function validatePassword(
  password: string,
  confirmPassword?: string
): string[] {
  const errors: string[] = [];

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  if (confirmPassword !== undefined && password !== confirmPassword) {
    errors.push('Passwords do not match');
  }

  return errors;
}
