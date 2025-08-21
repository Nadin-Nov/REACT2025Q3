import type { FC } from 'react';

import styles from '../../../features/mainPage/components/UncontrolledForm.module.css';

type SelectFieldProps = {
  id: string;
  name: string;
  label: string;
  options: string[];
  errors?: string[];
};

export const SelectField: FC<SelectFieldProps> = ({
  id,
  name,
  label,
  options,
  errors,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id}>{label}:</label>
    <select id={id} name={name}>
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
