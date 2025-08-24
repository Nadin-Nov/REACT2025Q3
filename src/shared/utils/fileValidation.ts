export const validateFile = (file: File): string[] | null => {
  const errors: string[] = [];

  if (!['image/png', 'image/jpeg'].includes(file.type)) {
    errors.push('Only PNG or JPEG files are allowed');
  }

  if (file.size > 2_000_000) {
    errors.push('File size must be less than 2MB');
  }

  return errors.length ? errors : null;
};
