import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { UncontrolledFormData } from '../../features/mainPage/types';

type FormsState = {
  uncontrolled: UncontrolledFormData[];
  hook: UncontrolledFormData[];
};

const initialState: FormsState = {
  uncontrolled: [],
  hook: [],
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
    addHookFormData: (state, action: PayloadAction<UncontrolledFormData>) => {
      state.hook.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData, addHookFormData } = formsSlice.actions;
export const formsReducer = formsSlice.reducer;
