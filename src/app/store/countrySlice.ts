import { createSlice } from '@reduxjs/toolkit';

type CountryState = {
  countries: string[];
};

const initialState: CountryState = {
  countries: [
    'USA',
    'Canada',
    'Germany',
    'France',
    'Japan',
    'United Kingdom',
    'Australia',
    'Italy',
    'Spain',
    'Brazil',
    'Mexico',
    'India',
    'China',
    'Russia',
    'South Korea',
    'Netherlands',
    'Sweden',
    'Norway',
    'Switzerland',
    'Belgium',
    'Argentina',
    'Chile',
    'South Africa',
    'New Zealand',
    'Portugal',
    'Greece',
    'Turkey',
    'Saudi Arabia',
    'United Arab Emirates',
    'Egypt',
  ],
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {},
});

export const countryReducer = countrySlice.reducer;
