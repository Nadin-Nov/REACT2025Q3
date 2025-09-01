import type { Co2Dataset } from '../types/co2';

export const getAllYears = (dataset: Co2Dataset): number[] => {
  const yearsSet = new Set<number>();
  Object.values(dataset).forEach((country) =>
    country.data.forEach((yearData) => yearsSet.add(yearData.year))
  );
  return Array.from(yearsSet).sort((a, b) => a - b);
};

export const getCountriesArray = (dataset: Co2Dataset) =>
  Object.entries(dataset);
