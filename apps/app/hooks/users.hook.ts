import useSWR from 'swr';
import { collectionFetcher } from '../helpers/fetcher';

export function useUsers() {
  const { data, error, mutate } = useSWR('users', collectionFetcher);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
