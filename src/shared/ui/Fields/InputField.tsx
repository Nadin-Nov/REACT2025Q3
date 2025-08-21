import clsx from 'clsx';
import type { FC } from 'react';

import styles from '../../../features/mainPage/components/UncontrolledForm.module.css';

type InputFieldProps = {
  id: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  errors?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  extra?: React.ReactNode;
};

export const InputField: FC<InputFieldProps> = ({
  id,
  name,
  label,
  type,
  placeholder,
  errors,
  onChange,
  extra,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id}>{label}:</label>
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      className={clsx({ [styles.errorInput]: errors?.length })}
      onChange={onChange}
    />
    {extra}
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </div>
);
