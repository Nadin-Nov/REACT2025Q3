import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type SelectedItem = {
  id: number;
  name: string;
  description: string;
  detailsUrl: string;
  image?: string;
};

type SelectedItemsState = {
  items: SelectedItem[];
};

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelect(state, action: PayloadAction<SelectedItem>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll(state) {
      state.items = [];
    },
  },
});

export const { toggleSelect, unselectAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
