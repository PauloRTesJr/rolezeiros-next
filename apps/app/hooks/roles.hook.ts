import { Role } from '@rolezeiros/models';
import useSWR, { KeyedMutator } from 'swr';
import { axiosFetcher, collectionFetcher } from '../helpers/fetcher';

export function useRoles() {
  const { data, error, mutate } = useSWR('roles', collectionFetcher);

  return {
    roles: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export function useRole(id: string): UseRoleType {
  const { data, error, mutate } = useSWR(`/api/roles/${id}`, axiosFetcher);

  return {
    role: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

export type UseRolesType = {
  roles: Role[];
  isLoading: boolean;
  isError: boolean;
  mutate: unknown;
};

export type UseRoleType = {
  role: Role;
  isLoading: boolean;
  isError: boolean;
  mutate: KeyedMutator<unknown>;
};
