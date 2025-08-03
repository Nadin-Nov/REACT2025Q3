import type { RickAndMortyApiResponse, RickAndMortyApiCharacter } from '../types';

export function isValidRickAndMortyApiResponse(
  data: unknown
): data is RickAndMortyApiResponse {
  if (!isObject(data)) return false;

  if (!isObject(data.info)) return false;
  if (!Array.isArray(data.results)) return false;

  const info = data.info;
  if (
    !isNumber(info.count) ||
    !isNumber(info.pages) ||
    !(isString(info.next) || info.next === null) ||
    !(isString(info.prev) || info.prev === null)
  ) {
    return false;
  }

  for (const item of data.results) {
    if (!isValidCharacter(item)) return false;
  }

  return true;
}

export function isValidRickAndMortyApiCharacter(
  char: unknown
): char is RickAndMortyApiCharacter {
  return isValidCharacter(char);
}

export function isValidCharacter(char: unknown): char is RickAndMortyApiCharacter {
  if (!isObject(char)) return false;

  if (
    !isNumber(char.id) ||
    !isString(char.name) ||
    !isString(char.status) ||
    !isString(char.species) ||
    !isString(char.gender) ||
    !isString(char.image)
  ) {
    return false;
  }

  if (!isValidLocation(char.origin)) return false;
  if (!isValidLocation(char.location)) return false;

  return true;
}

function isValidLocation(loc: unknown): loc is { name: string; url: string } {
  if (!isObject(loc)) return false;

  return isString(loc.name) && isString(loc.url);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
