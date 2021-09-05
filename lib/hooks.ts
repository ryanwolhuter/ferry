import useSWR from 'swr'
import { get } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'

const jsonFetcher = (selector?: string) => (url: string) =>
  fetch(url)
    .then(r => r.json())
    .then(data => selector
      ? get(data, selector, null)
      : data ?? null)

export function useFiles() {
  const { data, isValidating, mutate } = useSWR('/api/files', jsonFetcher('files'))

  return {
    files: data ?? [],
    filesLoading: isValidating,
    mutateFiles: mutate
  }
}

export function useSpaceUsed() {
  const { data, isValidating, mutate } = useSWR('/api/space-used', jsonFetcher('spaceUsed'))

  return {
    spaceUsed: data ?? 0,
    spaceUsedLoading: isValidating,
    mutateSpaceUsed: mutate
  }
}

export function useSubscriptionDetails() {
  const { data, isValidating, mutate } = useSWR('/api/subscription-details', jsonFetcher())

  const subscriptionExpires = data?.subscriptionExpires ?? 0
  const isPro = data?.isPro ?? false

  return {
    subscriptionDetails: { subscriptionExpires, isPro },
    subscriptionDetailsLoading: isValidating,
    mutateSubscriptionDetails: mutate
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