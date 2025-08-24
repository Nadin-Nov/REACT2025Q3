import { z } from 'zod';

import { validateFile } from '../../../shared/utils/fileValidation';
import { validatePassword } from '../../../shared/utils/passwordValidation';

export type FieldType =
  | 'text'
  | 'email'
  | 'number'
  | 'password'
  | 'checkbox'
  | 'select'
  | 'file'
  | 'radio';

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
};

export const formFields: FieldConfig[] = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
  { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter your age' },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Repeat password',
  },
  {
    name: 'gender',
    label: 'Gender',
    type: 'radio',
    options: ['Male', 'Female'],
  },
  { name: 'acceptTnC', label: 'Accept Terms', type: 'checkbox' },
  { name: 'country', label: 'Country', type: 'select' },
  { name: 'picture', label: 'Upload Picture', type: 'file' },
];

export const formSchema = z
  .object({
    name: z.string().regex(/^[A-Z]/, 'Name must start with a capital letter'),
    email: z.string().email('Invalid email'),
    age: z.coerce.number().nonnegative('Age must be positive'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    gender: z.enum(['Male', 'Female']),
    acceptTnC: z.boolean().refine((val) => val === true, 'You must accept T&C'),
    country: z.string().min(1, 'Country is required'),

    picture: z
      .unknown()
      .optional()
      .refine(
        (file): file is File | undefined => !file || file instanceof File,
        'File must be a valid File'
      )
      .refine(
        (file) => {
          if (!file) return true;
          if (!(file instanceof File)) return false;
          return validateFile(file)?.length === 0;
        },
        { message: 'Invalid file' }
      ),
  })
  .refine(
    (data) =>
      validatePassword(data.password, data.confirmPassword).length === 0,
    {
      message: 'Passwords do not match or are too weak',
      path: ['confirmPassword'],
    }
  );
