import useSWR from "swr";
import { get } from 'lodash'
import { useCallback, useEffect, useRef } from "react";

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

export function useIsMounted() {
  const isMountedRef = useRef(false)

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
    }
  }, [])

  return useCallback(() => isMountedRef.current, [])
}

export function useFirstRender() {
  const firstRender = useRef(true)

  useEffect(() => {
    firstRender.current = false
  }, [])

  return firstRender.current
}