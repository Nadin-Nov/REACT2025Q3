import { useGetCharactersQuery } from '../api/itemsApi';

export function useCharacters(searchTerm: string, page: number) {
  const { data, error, isLoading, isFetching, refetch } = useGetCharactersQuery(
    { searchTerm, page },
    {}
  );

  return {
    characters: data?.characters ?? [],
    totalPages: data?.totalPages ?? 1,
    loading: isLoading || isFetching,
    error,
    refetch,
  };
}
