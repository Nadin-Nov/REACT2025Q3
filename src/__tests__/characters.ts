import type { Character } from '../types';

import { mockValidApiResponse } from './apiResponses';

export const mockValidCharacters: Character[] = mockValidApiResponse.results.map((char) => ({
  id: char.id,
  name: char.name,
  description: `${char.species} - ${char.status} - from ${char.origin.name}`,
  image: char.image,
}));

export const mockEmptyCharacters: Character[] = [];
