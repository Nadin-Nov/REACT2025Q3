import type { FC } from 'react';
import { useState, useEffect } from 'react';

import styles from './AutocompleteField.module.css';

type Props = {
  id: string;
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  errors?: string[];
  placeholder?: string;
};

export const AutocompleteField: FC<Props> = ({
  id,
  label,
  options,
  value = '',
  onChange,
  errors = [],
  placeholder,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      setFilteredOptions(
        options.filter((opt) => opt.toLowerCase().includes(value.toLowerCase()))
      );
      setIsOpen(true);
    } else {
      setFilteredOptions([]);
      setIsOpen(false);
    }
  }, [value, options]);

  const handleSelect = (option: string) => {
    onChange?.(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        onFocus={() => value && setIsOpen(true)}
      />
      {errors?.map((err, i) => (
        <div key={i} className={styles.error}>
          {err}
        </div>
      ))}
      {isOpen && filteredOptions.length > 0 && (
        <ul className={styles.autocompleteList}>
          {filteredOptions.map((opt) => (
            <li key={opt} className={styles.autocompleteItem}>
              <button
                type="button"
                className={styles.autocompleteButton}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
