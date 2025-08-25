import { zodResolver } from '@hookform/resolvers/zod';
import type { FC, ChangeEvent } from 'react';
import { useState } from 'react';
import type { Resolver } from 'react-hook-form';
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
import type { ControlledFormData, ControlledFormProps } from '../types';

import styles from './form.module.css';
import { formFields, controlledFormSchema } from './formConfig';

const isFile = (val: unknown): val is File => val instanceof File;

export const ControlledForm: FC<ControlledFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<ControlledFormData>({
    resolver: zodResolver(
      controlledFormSchema
    ) as unknown as Resolver<ControlledFormData>,
    mode: 'onChange',
  });

  const onFormSubmit = async (data: ControlledFormData) => {
    const finalData: ControlledFormData = { ...data };

    if (finalData.picture && isFile(finalData.picture)) {
      finalData.picture = await fileToBase64(finalData.picture);
    }

    dispatch(addHookFormData(finalData));
    onSubmit?.(finalData);
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (val: File | undefined) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      onChange(undefined);
      return;
    }

    const validTypes = ['image/png', 'image/jpeg'];
    if (!validTypes.includes(file.type)) {
      setError('picture', {
        type: 'manual',
        message: 'Only PNG or JPEG allowed',
      });
      onChange(undefined);
      return;
    }

    if (file.size > 2_000_000) {
      setError('picture', {
        type: 'manual',
        message: 'File size must be < 2MB',
      });
      onChange(undefined);
      return;
    }

    clearErrors('picture');
    onChange(file);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onFormSubmit)();
      }}
    >
      {formFields.map((field) => {
        const fieldId = `controlled-${field.name}`;
        const fieldError = errors[field.name as keyof ControlledFormData] as
          | { message?: string }
          | undefined;
        const errorMessages = fieldError?.message
          ? [String(fieldError.message)]
          : [];

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
                    data-testid={fieldId}
                    name={String(ctrlField.name)}
                    label={field.label}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={
                      ctrlField.value != null ? String(ctrlField.value) : ''
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
                    data-testid={fieldId}
                    name={String(ctrlField.name)}
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
                      <PasswordStrengthIndicator
                        strength={passwordStrength}
                        data-testid={`strength-${field.name}`} // уникальный testid
                      />
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
                    name={String(ctrlField.name)}
                    data-testid={fieldId}
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
                    data-testid={fieldId}
                    name={String(ctrlField.name)}
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
                      data-testid={fieldId}
                      label={field.label}
                      options={countries}
                      value={
                        typeof ctrlField.value === 'string'
                          ? ctrlField.value
                          : ''
                      }
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
                    data-testid={fieldId}
                    name={String(ctrlField.name)}
                    label={field.label}
                    type="file"
                    onChange={(e) => handleFileChange(e, ctrlField.onChange)}
                    errors={errorMessages}
                  />
                )}
              />
            );

          default:
            return null;
        }
      })}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={!isValid}
        data-testid="submit-button"
      >
        Submit
      </button>
    </form>
  );
};
