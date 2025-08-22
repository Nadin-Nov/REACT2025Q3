import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../app/store';
import { addUncontrolledFormData } from '../../../app/store/formsSlice';
import { CheckboxField } from '../../../shared/ui/Fields/CheckboxField';
import { InputField } from '../../../shared/ui/Fields/InputField';
import { RadioField } from '../../../shared/ui/Fields/RadioField';
import { SelectField } from '../../../shared/ui/Fields/SelectField';
import {
  calculatePasswordStrength,
  parseUncontrolledForm,
  fileToBase64,
} from '../../../shared/utils/formHelpers';
import type { UncontrolledFormProps, UncontrolledFormData } from '../types';

import styles from './UncontrolledForm.module.css';
import { formFields, formSchema } from './formConfig';

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(calculatePasswordStrength(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const { data: parsedData, errors: parseErrors } =
      await parseUncontrolledForm(form, formFields, formSchema);

    if (parseErrors) {
      setErrors(parseErrors);
      return;
    }

    if (parsedData) {
      setErrors({});

      const data: UncontrolledFormData = { ...parsedData };

      const fileInput = form.elements.namedItem('picture') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        const file = fileInput.files[0];
        if (!['image/png', 'image/jpeg'].includes(file.type)) {
          setErrors({ picture: ['Only PNG or JPEG files are allowed'] });
          return;
        }
        if (file.size > 2_000_000) {
          setErrors({ picture: ['File size must be less than 2MB'] });
          return;
        }
        data.picture = await fileToBase64(file);
      }

      dispatch(addUncontrolledFormData(data));
      onSubmit?.(data);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className={styles.form}>
      {formFields.map((field) => {
        const fieldErrors = errors[field.name] || [];
        const inputId = `field-${field.name}`;

        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
          case 'password':
            return (
              <InputField
                key={field.name}
                id={inputId}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                errors={fieldErrors}
                onChange={
                  field.name === 'password' ? handlePasswordChange : undefined
                }
                extra={
                  field.name === 'password' && passwordStrength ? (
                    <div className={styles.passwordStrength}>
                      Strength: {passwordStrength}
                    </div>
                  ) : undefined
                }
              />
            );
          case 'checkbox':
            return (
              <CheckboxField
                key={field.name}
                id={inputId}
                name={field.name}
                label={field.label}
                errors={fieldErrors}
              />
            );
          case 'select':
            return (
              <SelectField
                key={field.name}
                id={inputId}
                name={field.name}
                label={field.label}
                options={
                  field.name === 'country' ? countries : field.options || []
                }
                errors={fieldErrors}
              />
            );
          case 'radio':
            return (
              <RadioField
                key={field.name}
                name={field.name}
                label={field.label}
                options={field.options || []}
                errors={fieldErrors}
              />
            );
          case 'file':
            return (
              <InputField
                key={field.name}
                id={inputId}
                name={field.name}
                label={field.label}
                type="file"
                errors={fieldErrors}
              />
            );
          default:
            return null;
        }
      })}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
