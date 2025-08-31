import type { Co2Dataset } from '../types/co2';

import { createResource } from './createResource';

const co2Promise: Promise<Co2Dataset> = fetch(
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json'
).then((res) => res.json() as Promise<Co2Dataset>);

export const co2Resource = createResource<Co2Dataset>(co2Promise);
