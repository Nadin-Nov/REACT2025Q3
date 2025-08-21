import type { FC } from 'react';

import styles from '../../../features/mainPage/components/UncontrolledForm.module.css';

type RadioFieldProps = {
  name: string;
  label: string;
  options: string[];
  errors?: string[];
};

export const RadioField: FC<RadioFieldProps> = ({
  name,
  label,
  options,
  errors,
}) => (
  <fieldset className={styles.formGroup}>
    <legend>{label}:</legend>
    {options.map((opt) => (
      <label key={opt}>
        <input type="radio" name={name} value={opt} />
        {opt}
      </label>
    ))}
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </fieldset>
);
