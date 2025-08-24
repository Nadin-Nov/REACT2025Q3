import type { z } from 'zod';

import type { formSchema } from './components/formConfig';

export type UncontrolledFormData = z.infer<typeof formSchema> & {
  picture?: File | string;
};

export type UncontrolledFormProps = {
  onSubmit?: (data: UncontrolledFormData) => void;
};

export type FormTilesProps = {
  data: UncontrolledFormData[];
};

export type ControlledFormData = z.infer<typeof formSchema> & {
  picture?: File | string;
};

export type ControlledFormProps = {
  onSubmit?: (data: ControlledFormData) => void;
};
