import useSWR from "swr";
import { get } from 'lodash'

const jsonFetcher = (selector?: string) => (url: string) =>
  fetch(url)
    .then(r => r.json())
    .then(data => selector
      ? get(data, selector, null)
      : data ?? null)

export function useAllFiles() {
  const { data, isValidating, mutate } = useSWR('/api/files', jsonFetcher('files'))
  return { files: data ?? [], loading: isValidating, mutate }
}

export function useUser() {
  const { data, isValidating } = useSWR('/api/user', jsonFetcher())
  const user = data?.user ?? null
  return { user, loading: isValidating }
}