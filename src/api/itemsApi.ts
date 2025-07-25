import type {
  Character,
  FetchCharactersResult,
  RickAndMortyApiResponse,
} from '../types/index';
import { isValidRickAndMortyApiResponse } from '../utils/validation';

export async function fetchCharacters(
  searchTerm: string,
  page = 1
): Promise<FetchCharactersResult> {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (searchTerm.trim()) {
    params.append('name', searchTerm.trim());
  }

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${params.toString()}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      return {
        characters: [],
        totalPages: 0,
        currentPage: page,
      };
    }
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const rawData: unknown = await response.json();

  if (!isValidRickAndMortyApiResponse(rawData)) {
    throw new Error('Invalid API response structure');
  }

  const data: RickAndMortyApiResponse = rawData;

  const characters: Character[] = data.results.map((char) => ({
    id: char.id,
    name: char.name,
    description: `${char.species} - ${char.status} - from ${char.origin.name}`,
    image: char.image,
  }));

  return {
    characters,
    totalPages: data.info.pages,
    currentPage: page,
  };
}
