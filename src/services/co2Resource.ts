import type { Co2Dataset } from '../types/co2';

import { createResource } from './createResource';

const co2Promise: Promise<Co2Dataset> = fetch(
  'https://Nadin-Nov.github.io/co2-data/owid-co2-data.json'
).then((res) => {
  if (!res.ok) throw new Error(`Failed to fetch CO₂ data: ${res.status}`);
  return res.json() as Promise<Co2Dataset>;
});

export const co2Resource = createResource<Co2Dataset>(co2Promise);
