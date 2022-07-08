import { useState, useCallback, useMemo, useRef } from 'react'

import { observerInit, getHighestElement } from './useRunningHeader.helpers'

import { useObserver } from 'src/common/hooks/hooks'

export const useRunningHeader = (selector: string) => {
  const [id, setHighestHeader] = useState<string | null>(null)
  const subscribers = useRef<readonly HTMLElement[]>([])
  const currentlyVisibleHeaders = useMemo(() => new Set<HTMLElement>(), [])

  const { observeElement, cleanup } = useObserver(observerInit, (entry) => {
    if (entry.isIntersecting) {
      currentlyVisibleHeaders.add(entry.target as HTMLElement)
    } else {
      currentlyVisibleHeaders.delete(entry.target as HTMLElement)
    }

    const highestHeader = getHighestElement([...currentlyVisibleHeaders])

    if (highestHeader) {
      setHighestHeader(highestHeader.id)
    }
  })

  const setRunningHeader = useCallback(
    (htmlElement: HTMLElement | null) => {
      if (!htmlElement) {
        setHighestHeader(null)
        cleanup()

        return
      }

      const nodeList = htmlElement.querySelectorAll<HTMLElement>(selector)

      nodeList.forEach(observeElement)
      subscribers.current = [...nodeList]
    },
    [cleanup, observeElement, selector]
  )

  return { id, subscribers, setRunningHeader }
}
