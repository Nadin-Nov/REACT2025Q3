export type Character = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type FetchCharactersResult = {
  characters: Character[];
  totalPages: number;
};

export type RickAndMortyApiResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickAndMortyApiCharacter[];
};

export type RickAndMortyApiCharacter = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
};
