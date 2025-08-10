import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { Character, FetchCharactersResult } from '../types';
import {
  isValidRickAndMortyApiResponse,
  isValidRickAndMortyApiCharacter,
} from '../utils/validation';

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/api/',
  }),
  tagTypes: ['Characters', 'Character'],
  endpoints: (builder) => ({
    getCharacters: builder.query<
      FetchCharactersResult,
      { searchTerm: string; page?: number }
    >({
      query: ({ searchTerm, page = 1 }) => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (searchTerm.trim()) {
          params.append('name', searchTerm.trim());
        }
        return `character?${params.toString()}`;
      },
      transformResponse: (
        rawData: unknown,
        _meta,
        arg
      ): FetchCharactersResult => {
        if (!isValidRickAndMortyApiResponse(rawData)) {
          throw new Error('Invalid API response structure');
        }

        const data = rawData;

        const characters: Character[] = data.results.map((char) => ({
          id: char.id,
          name: char.name,
          description: `${char.species} - ${char.status} - from ${char.origin.name}`,
          image: char.image,
        }));

        return {
          characters,
          totalPages: data.info.pages,
          currentPage: arg.page ?? 1,
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.characters.map(({ id }) => ({
                type: 'Character' as const,
                id,
              })),
              { type: 'Characters', id: 'LIST' },
            ]
          : [{ type: 'Characters', id: 'LIST' }],
    }),

    getCharacterById: builder.query<Character, number>({
      query: (id) => `character/${id}`,
      transformResponse: (rawData: unknown): Character => {
        if (!isValidRickAndMortyApiCharacter(rawData)) {
          throw new Error('Invalid API response structure');
        }

        const char = rawData;

        return {
          id: char.id,
          name: char.name,
          description: `${char.species} - ${char.status} - from ${char.origin.name}`,
          image: char.image,
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'Character', id }],
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = itemsApi;
