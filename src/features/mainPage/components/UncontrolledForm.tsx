import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../app/store';
import { addUncontrolledFormData } from '../../../app/store/formsSlice';
import {
  fileToBase64,
  parseUncontrolledForm,
} from '../../../shared/utils/formHelpers';
import { validatePassword } from '../../../shared/utils/passwordValidation';
import type { UncontrolledFormProps, UncontrolledFormData } from '../types';

import { FormFieldRenderer } from './FormFieldRenderer';
import styles from './form.module.css';
import { formFields, uncontrolledFormSchema } from './formConfig';

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const { data: parsedData, errors: parseErrors } =
      await parseUncontrolledForm(form, formFields, uncontrolledFormSchema);

    if (parseErrors) {
      setErrors(parseErrors);
      return;
    }

    if (!parsedData) return;

    const passwordErrors = validatePassword(
      parsedData.password,
      parsedData.confirmPassword
    );
    if (passwordErrors.length > 0) {
      setErrors({ password: passwordErrors });
      return;
    }

    let pictureBase64: string | undefined = undefined;
    const fileInput = form.elements.namedItem(
      'picture'
    ) as HTMLInputElement | null;

    if (fileInput?.files?.[0]) {
      pictureBase64 = await fileToBase64(fileInput.files[0]);
    } else if (typeof parsedData.picture === 'string') {
      pictureBase64 = parsedData.picture;
    }

    const data: UncontrolledFormData = {
      ...parsedData,
      picture: pictureBase64,
    };

    setErrors({});
    dispatch(addUncontrolledFormData(data));
    onSubmit?.(data);
  };

  return (
    <form
      onSubmit={(e) => void handleSubmit(e)}
      className={styles.form}
      data-testid="uncontrolled-form"
    >
      {formFields.map((field) => (
        <FormFieldRenderer
          key={field.name}
          field={field}
          errors={errors[field.name] || []}
          countries={countries}
          uncontrolled={true}
          data-testid={`field-${field.name}`}
        />
      ))}
      <button
        type="submit"
        className={styles.submitButton}
        data-testid="submit-btn"
      >
        Submit
      </button>
    </form>
  );
};
