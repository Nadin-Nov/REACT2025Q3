import type { z } from 'zod';

import type {
  controlledFormSchema,
  uncontrolledFormSchema,
} from './components/formConfig';

export type UncontrolledFormDataForm = z.infer<
  typeof uncontrolledFormSchema
> & {
  picture?: File;
};

export type UncontrolledFormData = Omit<UncontrolledFormDataForm, 'picture'> & {
  picture?: string;
};

export type UncontrolledFormProps = {
  onSubmit?: (data: UncontrolledFormData) => void;
};

export type FormTilesProps = {
  data: UncontrolledFormData[];
};

export type ControlledFormDataForm = z.infer<typeof controlledFormSchema> & {
  picture?: File;
};

export type ControlledFormData = Omit<ControlledFormDataForm, 'picture'> & {
  picture?: string;
};

export type ControlledFormProps = {
  onSubmit?: (data: ControlledFormData) => void;
};
