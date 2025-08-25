import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  UncontrolledFormData,
  ControlledFormData,
} from '../../features/mainPage/types';

export type FormsState = {
  uncontrolled: UncontrolledFormData[];
  hookForm: ControlledFormData[];
};

const initialState: FormsState = {
  uncontrolled: [],
  hookForm: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledFormData: (
      state,
      action: PayloadAction<UncontrolledFormData>
    ) => {
      state.uncontrolled.push(action.payload);
    },
    addHookFormData: (state, action: PayloadAction<ControlledFormData>) => {
      state.hookForm.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData, addHookFormData } = formsSlice.actions;
export const formsReducer = formsSlice.reducer;
