import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type FormData = Record<string, unknown>;

type FormsState = {
  uncontrolled: FormData[];
  hook: FormData[];
};

const initialState: FormsState = {
  uncontrolled: [],
  hook: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addUncontrolledFormData: (state, action: PayloadAction<FormData>) => {
      state.uncontrolled.push(action.payload);
    },
    addHookFormData: (state, action: PayloadAction<FormData>) => {
      state.hook.push(action.payload);
    },
  },
});

export const { addUncontrolledFormData, addHookFormData } = formsSlice.actions;
export const formsReducer = formsSlice.reducer;
