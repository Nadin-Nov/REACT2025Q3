import type { FC } from 'react';

import styles from '../../../features/mainPage/components/form.module.css';

type RadioFieldProps = {
  name: string;
  label: string;
  options: string[];
  value?: string;
  defaultValue?: string;
  uncontrolled?: boolean;
  onChange?: (value: string) => void;
  errors?: string[];
};

export const RadioField: FC<RadioFieldProps> = ({
  name,
  label,
  options,
  value,
  defaultValue,
  uncontrolled = false,
  onChange,
  errors,
}) => (
  <fieldset className={styles.formGroup}>
    <legend>{label}:</legend>
    {options.map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name={name}
          value={opt}
          {...(uncontrolled
            ? { defaultChecked: opt === defaultValue }
            : { checked: value === opt, onChange: () => onChange?.(opt) })}
        />
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
