import clsx from 'clsx';
import type { FC } from 'react';

import styles from '../../../features/mainPage/components/form.module.css';

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value?: string | number;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extra?: React.ReactNode;
  uncontrolled?: boolean;
  'data-testid'?: string;
};

export const InputField: FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  value,
  errors,
  onChange,
  extra,
  uncontrolled = false,
  'data-testid': testId,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id}>{label}:</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={clsx({ [styles.errorInput]: errors?.length })}
      {...(uncontrolled
        ? { defaultValue: value ?? '' }
        : { value: value ?? '', onChange })}
      data-testid={testId}
    />
    {extra}
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </div>
);
