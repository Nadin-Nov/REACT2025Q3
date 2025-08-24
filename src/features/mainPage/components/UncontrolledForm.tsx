import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { RootState } from '../../../app/store';
import { addUncontrolledFormData } from '../../../app/store/formsSlice';
import { validateFile } from '../../../shared/utils/fileValidation';
import {
  fileToBase64,
  parseUncontrolledForm,
} from '../../../shared/utils/formHelpers';
import { validatePassword } from '../../../shared/utils/passwordValidation';
import type { UncontrolledFormProps, UncontrolledFormData } from '../types';

import { FormFieldRenderer } from './FormFieldRenderer';
import styles from './form.module.css';
import { formFields, formSchema } from './formConfig';

export const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.country.countries);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const { data: parsedData, errors: parseErrors } =
      await parseUncontrolledForm(form, formFields, formSchema);

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
      const file = fileInput.files[0];
      const fileErrors = validateFile(file);
      if (fileErrors) {
        setErrors({ picture: fileErrors });
        return;
      }
      pictureBase64 = await fileToBase64(file);
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
    <form onSubmit={(e) => void handleSubmit(e)} className={styles.form}>
      {formFields.map((field) => (
        <FormFieldRenderer
          key={field.name}
          field={field}
          errors={errors[field.name] || []}
          countries={countries}
        />
      ))}
      <button type="submit" className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};
