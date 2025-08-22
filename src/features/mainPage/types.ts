import type { z } from 'zod';

import type { formSchema } from './components/formConfig';

export type UncontrolledFormData = z.infer<typeof formSchema> & {
  picture?: string;
};

export type UncontrolledFormProps = {
  onSubmit?: (data: UncontrolledFormData) => void;
};

export type FormTilesProps = {
  data: UncontrolledFormData[];
};
