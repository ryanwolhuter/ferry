import useSWR from 'swr'
import { get } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'

const jsonFetcher = (selector?: string) => (url: string) =>
  fetch(url)
    .then(r => r.json())
    .then(data => selector
      ? get(data, selector, null)
      : data ?? null)

export function useAllFiles() {
  const { data, isValidating, mutate } = useSWR('/api/files', jsonFetcher('files'))

  return {
    files: data ?? [],
    filesLoading: isValidating,
    mutateFiles: mutate
  }
}

export function useUserSpaceUsed() {
  const { data, isValidating, mutate } = useSWR('/api/space-used', jsonFetcher('spaceUsed'))

  return {
    spaceUsed: data ?? 0,
    spaceUsedLoading: isValidating,
    mutateSpaceUsed: mutate
  }
}

export function useSubscriptionExpires() {
  const { data, isValidating, mutate } = useSWR('/api/subscription-expires', jsonFetcher('subscriptionExpires'))

  return {
    subscriptionExpires: data ?? 0,
    subscriptionExpiresLoading: isValidating,
    mutateSubscriptionExpires: mutate
  }
}

export function useUser() {
  const { data, isValidating, mutate } = useSWR('/api/user', jsonFetcher())

  return { 
    user: data?.user ?? null, 
    userLoading: isValidating,
    mutateUser: mutate
   }
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