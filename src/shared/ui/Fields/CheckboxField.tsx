import type { FC } from 'react';

import styles from '../../../features/mainPage/components/UncontrolledForm.module.css';

type CheckboxFieldProps = {
  id: string;
  name: string;
  label: string;
  errors?: string[];
};

export const CheckboxField: FC<CheckboxFieldProps> = ({
  id,
  name,
  label,
  errors,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id} className={styles.checkboxLabel}>
      <input id={id} type="checkbox" name={name} />
      {label}
    </label>
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </div>
);
