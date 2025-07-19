import type { RickAndMortyApiResponse } from '../types';

export const mockValidApiResponse: RickAndMortyApiResponse = {
  info: {
    count: 1,
    pages: 1,
    next: null,
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: { name: 'Earth (C-137)', url: '' },
      location: { name: 'Earth (Replacement Dimension)', url: '' },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    },
  ],
};

export const mockInvalidApiResponse = {
  bad: 'data',
};

export const mockEmptyApiResponse: RickAndMortyApiResponse = {
  info: {
    count: 0,
    pages: 0,
    next: null,
    prev: null,
  },
  results: [],
};
