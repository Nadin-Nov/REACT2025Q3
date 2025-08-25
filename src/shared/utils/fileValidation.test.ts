import { describe, it, expect } from 'vitest';

import { validateFile } from './fileValidation';

function createFile(name: string, type: string, size: number): File {
  const file = new File(['dummy'], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

describe('validateFile', () => {
  it('returns null for valid PNG file under 2MB', () => {
    const file = createFile('image.png', 'image/png', 1_000_000);
    expect(validateFile(file)).toBeNull();
  });

  it('returns null for valid JPEG file under 2MB', () => {
    const file = createFile('photo.jpeg', 'image/jpeg', 1_500_000);
    expect(validateFile(file)).toBeNull();
  });

  it('returns error for invalid file type', () => {
    const file = createFile('file.gif', 'image/gif', 500_000);
    expect(validateFile(file)).toEqual(['Only PNG or JPEG files are allowed']);
  });

  it('returns error for file size > 2MB', () => {
    const file = createFile('big.png', 'image/png', 3_000_000);
    expect(validateFile(file)).toEqual(['File size must be less than 2MB']);
  });

  it('returns multiple errors for wrong type and too big', () => {
    const file = createFile('big.gif', 'image/gif', 3_000_000);
    expect(validateFile(file)).toEqual([
      'Only PNG or JPEG files are allowed',
      'File size must be less than 2MB',
    ]);
  });
});
