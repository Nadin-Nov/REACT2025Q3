import type { ZodType } from 'zod';

import type { FieldConfig } from '../../features/mainPage/components/formConfig';

export const calculatePasswordStrength = (pwd: string) => {
  let score = 0;
  if (/[0-9]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return ['', 'Weak', 'Medium', 'Strong'][score] || '';
};

export const fileToBase64 = (file: File): Promise<string> =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.readAsDataURL(file);
  });

type FieldValue<T extends FieldConfig['type']> = T extends 'checkbox'
  ? boolean
  : T extends 'number'
    ? number
    : T extends 'file'
      ? string
      : string;

export const parseUncontrolledForm = async <T extends Record<string, unknown>>(
  form: HTMLFormElement,
  formFields: FieldConfig[],
  formSchema: ZodType<T>
): Promise<{ data?: T; errors?: Record<string, string[]> }> => {
  const formData: Partial<T> = {};

  for (const field of formFields) {
    const element = form.elements.namedItem(field.name) as
      | HTMLInputElement
      | HTMLSelectElement
      | null;
    if (!element) continue;

    let value: FieldValue<typeof field.type>;

    switch (field.type) {
      case 'checkbox':
        value = (element as HTMLInputElement).checked;
        break;

      case 'number':
        value = Number((element as HTMLInputElement).value);
        break;

      case 'file': {
        const files = (element as HTMLInputElement).files;
        value = files && files[0] ? await fileToBase64(files[0]) : '';
        break;
      }

      default:
        value = element.value;
    }

    formData[field.name as keyof T] = value as T[keyof T];
  }

  const result = formSchema.safeParse(formData);

  if (!result.success) {
    const errors: Record<string, string[]> = {};
    const fieldErrors = result.error.flatten().fieldErrors;
    for (const key in fieldErrors) {
      if (fieldErrors[key]) {
        errors[key] = fieldErrors[key]!;
      }
    }
    return { errors };
  }

  return { data: result.data };
};
