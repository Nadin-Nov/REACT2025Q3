import type { FC } from 'react';

import styles from '../../../features/mainPage/components/form.module.css';

type CheckboxFieldProps = {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  defaultChecked?: boolean;
  uncontrolled?: boolean;
  onChange?: (checked: boolean) => void;
  errors?: string[];
};

export const CheckboxField: FC<CheckboxFieldProps> = ({
  id,
  name,
  label,
  checked = false,
  defaultChecked = false,
  uncontrolled = false,
  onChange,
  errors,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor={id} className={styles.checkboxLabel}>
      <input
        id={id}
        type="checkbox"
        name={name}
        {...(uncontrolled
          ? { defaultChecked }
          : {
              checked,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                onChange?.(e.target.checked),
            })}
      />
      {label}
    </label>
    {errors?.map((err, i) => (
      <div key={i} className={styles.errorMessage}>
        {err}
      </div>
    ))}
  </div>
);
