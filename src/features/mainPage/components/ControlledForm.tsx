import { zodResolver } from '@hookform/resolvers/zod';
import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import type { SubmitHandler, Resolver } from 'react-hook-form';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState } from '../../../app/store';
import { addHookFormData } from '../../../app/store/formsSlice';
import { AutocompleteField } from '../../../shared/ui/Fields/AutocompleteField';
import { CheckboxField } from '../../../shared/ui/Fields/CheckboxField';
import { InputField } from '../../../shared/ui/Fields/InputField';
import { PasswordStrengthIndicator } from '../../../shared/ui/Fields/PasswordStrengthIndicator';
import { RadioField } from '../../../shared/ui/Fields/RadioField';
import {
  fileToBase64,
  calculatePasswordStrength,
} from '../../../shared/utils/formHelpers';
import type { ControlledFormProps, ControlledFormData } from '../types';

import styles from './form.module.css';
import { formFields, formSchema } from './formConfig';

export const ControlledForm: FC<ControlledFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ControlledFormData>({
    resolver: zodResolver(
      formSchema
    ) as unknown as Resolver<ControlledFormData>,
    mode: 'onChange',
  });

  const onFormSubmit: SubmitHandler<ControlledFormData> = (data) => {
    void (async () => {
      const finalData: ControlledFormData = { ...data };

      if (finalData.picture && finalData.picture instanceof File) {
        finalData.picture = await fileToBase64(finalData.picture);
      }

      dispatch(addHookFormData(finalData));
      onSubmit?.(finalData);
    })();
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onFormSubmit)();
      }}
    >
      {' '}
      {formFields.map((field) => {
        const fieldId = `controlled-${field.name}`;
        const fieldErrors = errors[field.name as keyof ControlledFormData];
        const errorMessages = fieldErrors?.message ? [fieldErrors.message] : [];

        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
            return (
              <Controller
                key={field.name}
                name={field.name as keyof ControlledFormData}
                control={control}
                render={({ field: ctrlField }) => (
                  <InputField
                    id={fieldId}
                    name={ctrlField.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={
                      ctrlField.value === undefined ||
                      ctrlField.value === null ||
                      typeof ctrlField.value === 'boolean' ||
                      ctrlField.value instanceof File
                        ? ''
                        : ctrlField.value.toString()
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      ctrlField.onChange(
                        field.type === 'number'
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                    errors={errorMessages}
                  />
                )}
              />
            );

          case 'password':
            return (
              <Controller
                key={field.name}
                name={field.name as keyof ControlledFormData}
                control={control}
                render={({ field: ctrlField }) => (
                  <InputField
                    id={fieldId}
                    name={ctrlField.name}
                    label={field.label}
                    placeholder={field.placeholder}
                    type="password"
                    value={
                      typeof ctrlField.value === 'string' ? ctrlField.value : ''
                    }
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      ctrlField.onChange(e.target.value);
                      setPasswordStrength(
                        calculatePasswordStrength(e.target.value)
                      );
                    }}
                    errors={errorMessages}
                    extra={
                      <PasswordStrengthIndicator strength={passwordStrength} />
                    }
                  />
                )}
              />
            );

          case 'radio':
            return (
              <Controller
                key={field.name}
                name={field.name as keyof ControlledFormData}
                control={control}
                render={({ field: ctrlField }) => (
                  <RadioField
                    name={ctrlField.name}
                    label={field.label}
                    options={field.options || []}
                    value={
                      typeof ctrlField.value === 'string' ? ctrlField.value : ''
                    }
                    onChange={(val) => ctrlField.onChange(val)}
                    errors={errorMessages}
                  />
                )}
              />
            );

          case 'checkbox':
            return (
              <Controller
                key={field.name}
                name={field.name as keyof ControlledFormData}
                control={control}
                render={({ field: ctrlField }) => (
                  <CheckboxField
                    id={fieldId}
                    name={ctrlField.name}
                    label={field.label}
                    checked={!!ctrlField.value}
                    onChange={ctrlField.onChange}
                    errors={errorMessages}
                  />
                )}
              />
            );

          case 'select':
            if (field.name === 'country') {
              return (
                <Controller
                  key={field.name}
                  name="country"
                  control={control}
                  render={({ field: ctrlField }) => (
                    <AutocompleteField
                      id={fieldId}
                      label={field.label}
                      options={countries}
                      value={ctrlField.value ?? ''}
                      onChange={ctrlField.onChange}
                      errors={errorMessages}
                    />
                  )}
                />
              );
            }
            return null;

          case 'file':
            return (
              <Controller
                key={field.name}
                name="picture"
                control={control}
                render={({ field: ctrlField }) => (
                  <InputField
                    id={fieldId}
                    name={ctrlField.name}
                    label={field.label}
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      ctrlField.onChange(e.target.files?.[0] ?? undefined)
                    }
                    errors={errorMessages}
                  />
                )}
              />
            );

          default:
            return null;
        }
      })}
      <button type="submit" className={styles.submitButton} disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
