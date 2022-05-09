/* eslint-disable functional/prefer-readonly-type -- required functionality */
import { useState, useMemo, useCallback } from 'react'

import { createObserver } from './useObserver.helpers'

import type { ObserverInit } from './useObserver.helpers'

import { useUnMount } from 'common/hooks/hooks'
import { noop } from 'common/utils/utils'

const isServer = typeof window === 'undefined'

const { observe } = createObserver()

export const useObserver = (observerInit: ObserverInit) => {
  const unobserve = useMemo<Map<Element, Noop>>(() => new Map(), [])

  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)

  const cleanup = useCallback(() => {
    unobserve.forEach((callback) => callback())
    unobserve.clear()
  }, [unobserve])

  const observeElement = useCallback(
    (element: Element | null) => {
      if (!element) {
        return
      }

      if (unobserve.has(element)) {
        unobserve.get(element)?.()
      }

      unobserve.set(element, observe(element, setEntry, observerInit))
    },
    [observerInit, unobserve]
  )

  useUnMount(() => {
    cleanup()
  })

  if (isServer) {
    return { entry: null, observeElement: noop, cleanup: noop }
  }

  return { entry, observeElement, cleanup }
}
