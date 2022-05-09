/* eslint-disable functional/prefer-readonly-type -- required functionality */
import { useMemo, useCallback, useRef } from 'react'

import { createObserver } from './useObserver.helpers'

import type { ObserverInit, ObserverCallback } from './useObserver.helpers'

import { useUnMount, useUpdate } from 'common/hooks/hooks'
import { noop } from 'common/utils/utils'

const isServer = typeof window === 'undefined'

const { observe } = createObserver()

export const useObserver = (
  observerInit: ObserverInit,
  observerCallback: ObserverCallback
) => {
  type Subscriber = ReturnType<typeof observe>

  const subscribers = useMemo<Map<Element, Subscriber>>(() => new Map(), [])
  const savedObserverCallback = useRef(observerCallback)

  useUpdate(() => {
    savedObserverCallback.current = observerCallback
  }, [observerCallback])

  useUnMount(() => {
    cleanup()
  })

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
      const subscriber = observe(
        element,
        (entry) => savedObserverCallback.current(entry),
        observerInit
      )

      subscribers.set(element, subscriber)
    },
    [observerInit, subscribers]
  )

  if (isServer) {
    return { observeElement: noop, cleanup: noop }
  }

  return { observeElement, cleanup }
}
