import type { FC } from 'react';

import { CheckboxField } from '../../../shared/ui/Fields/CheckboxField';
import { InputField } from '../../../shared/ui/Fields/InputField';
import { RadioField } from '../../../shared/ui/Fields/RadioField';
import { SelectField } from '../../../shared/ui/Fields/SelectField';

import styles from './form.module.css';
import type { FieldConfig } from './formConfig';

type Props = {
  field: FieldConfig;
  errors: string[];
  countries: string[];
  uncontrolled?: boolean;
};

export const FormFieldRenderer: FC<Props> = ({
  field,
  errors,
  countries,
  uncontrolled = false,
}) => {
  const inputId = `field-${field.name}`;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
    case 'password':
      return (
        <InputField
          id={inputId}
          name={field.name}
          label={field.label}
          type={field.type}
          placeholder={field.placeholder}
          errors={errors}
          uncontrolled={uncontrolled}
        />
      );

    case 'checkbox':
      return (
        <CheckboxField
          id={inputId}
          name={field.name}
          label={field.label}
          errors={errors}
          uncontrolled={uncontrolled}
        />
      );

    case 'radio':
      return (
        <RadioField
          name={field.name}
          label={field.label}
          options={field.options || []}
          errors={errors}
          uncontrolled={uncontrolled}
        />
      );

    case 'select':
      if (field.name === 'country') {
        return (
          <div className={styles.fieldWrapper}>
            <label htmlFor={inputId}>{field.label}</label>
            <input
              id={inputId}
              name={field.name}
              list="countries-list"
              placeholder={field.placeholder}
              data-testid={`${field.name}-input`}
              {...(uncontrolled ? { defaultValue: '' } : {})}
            />
            <datalist id="countries-list">
              {countries.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            {errors.length > 0 && (
              <div className={styles.error}>{errors.join(', ')}</div>
            )}
          </div>
        );
      }
      return (
        <SelectField
          id={inputId}
          name={field.name}
          label={field.label}
          options={field.options || []}
          errors={errors}
          uncontrolled={uncontrolled}
        />
      );

    case 'file':
      return (
        <InputField
          id={inputId}
          name={field.name}
          label={field.label}
          type="file"
          errors={errors}
          uncontrolled={uncontrolled}
        />
      );

    default:
      return null;
  }
};
