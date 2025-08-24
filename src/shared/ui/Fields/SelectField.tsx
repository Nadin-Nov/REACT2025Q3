import type { FC, ChangeEvent } from 'react';

import styles from '../../../features/mainPage/components/form.module.css';

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
};

export const SelectField: FC<SelectFieldProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  errors,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id}>{label}:</label>
    <select
      id={id}
      name={name}
      value={value ?? ''}
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        onChange?.(e.target.value)
      }
    >
      <option value="" disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </div>
);
