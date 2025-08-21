import { configureStore } from '@reduxjs/toolkit';

import { countryReducer } from './countrySlice';
import { formsReducer } from './formsSlice';

export const store = configureStore({
  reducer: {
    country: countryReducer,
    forms: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
