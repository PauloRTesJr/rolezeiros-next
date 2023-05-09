import useSWR, { KeyedMutator } from 'swr';
import { Split } from '@rolezeiros/models';
import { axiosFetcher } from '../helpers/fetcher';

export function useSplit(id: string): SplitType {
  const { data, error, mutate } = useSWR(
    `/api/roles/${id}/split`,
    axiosFetcher
  );

  return {
    split: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export type SplitType = {
  split: Split;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<unknown>;
};
