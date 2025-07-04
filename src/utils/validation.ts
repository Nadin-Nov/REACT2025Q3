import type { RickAndMortyApiResponse } from '../types/index';

export function isValidRickAndMortyApiResponse(
  data: unknown
): data is RickAndMortyApiResponse {
  if (typeof data !== 'object' || data === null) return false;

  const obj = data as Record<string, unknown>;

  if (
    !('info' in obj) ||
    !('results' in obj) ||
    typeof obj.info !== 'object' ||
    obj.info === null ||
    !Array.isArray(obj.results)
  ) {
    return false;
  }

  const info = obj.info as Record<string, unknown>;
  if (
    typeof info.count !== 'number' ||
    typeof info.pages !== 'number' ||
    (typeof info.next !== 'string' && info.next !== null) ||
    (typeof info.prev !== 'string' && info.prev !== null)
  ) {
    return false;
  }

  for (const item of obj.results) {
    if (typeof item !== 'object' || item === null) return false;
    const character = item as Record<string, unknown>;
    if (
      typeof character.id !== 'number' ||
      typeof character.name !== 'string' ||
      typeof character.status !== 'string' ||
      typeof character.species !== 'string' ||
      typeof character.gender !== 'string' ||
      typeof character.origin !== 'object' ||
      character.origin === null ||
      typeof character.location !== 'object' ||
      character.location === null ||
      typeof character.image !== 'string'
    ) {
      return false;
    }

    const origin = character.origin as Record<string, unknown>;
    if (typeof origin.name !== 'string' || typeof origin.url !== 'string')
      return false;

    const location = character.location as Record<string, unknown>;
    if (typeof location.name !== 'string' || typeof location.url !== 'string')
      return false;
  }

  return true;
}
