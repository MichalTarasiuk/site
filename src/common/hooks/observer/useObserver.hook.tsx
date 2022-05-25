/* eslint-disable functional/prefer-readonly-type -- required functionality */
import { useMemo, useCallback } from 'react'

import { createObservers } from './useObserver.helpers'

import type { ObserverInit, ObserverCallback } from './useObserver.helpers'

import { isServerEnvironment } from 'src/common/constants/constants'
import { useUnMount } from 'src/common/hooks/hooks'
import { noop } from 'src/common/utils/utils'

const { observe } = createObservers()

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

  if (isServerEnvironment) {
    return { observeElement: noop, cleanup: noop }
  }

  return { observeElement, cleanup }
}
