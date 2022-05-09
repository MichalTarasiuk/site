/* eslint-disable functional/prefer-readonly-type -- required functionality */
import { useMemo, useCallback } from 'react'

import { createObserver } from './useObserver.helpers'

import type { ObserverInit, ObserverCallback } from './useObserver.helpers'

import { useUnMount } from 'common/hooks/hooks'
import { noop } from 'common/utils/utils'

const isServer = typeof window === 'undefined'

const { observe } = createObserver()

export const useObserver = (
  observerInit: ObserverInit,
  observerCallback: ObserverCallback
) => {
  type Subscriber = ReturnType<typeof observe>

  const subscribers = useMemo<Map<Element, Subscriber>>(() => new Map(), [])

  const cleanup = useCallback(() => {
    subscribers.forEach((subscriber) => subscriber.unobserve())
    subscribers.clear()
  }, [subscribers])

  const observeElement = useCallback(
    (element: Element | null) => {
      if (!element) {
        return
      }

      if (subscribers.has(element)) {
        subscribers.get(element)?.unobserve()
      }
      const subscriber = observe(element, observerCallback, observerInit)

      subscribers.set(element, subscriber)
    },
    [observerCallback, observerInit, subscribers]
  )

  useUnMount(cleanup)

  if (isServer) {
    return { observeElement: noop, cleanup: noop }
  }

  return { observeElement, cleanup }
}
