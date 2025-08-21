import { createSlice } from '@reduxjs/toolkit';

type CountryState = {
  countries: string[];
};

const initialState: CountryState = {
  countries: ['USA', 'Canada', 'Germany', 'France', 'Japan'],
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const countryReducer = countrySlice.reducer;
