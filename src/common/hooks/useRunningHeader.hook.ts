import { useState, useCallback, useMemo, useRef } from 'react'

import { useObserver } from 'src/common/hooks/hooks'

const observerInit = {
  threshold: 1,
}

const getHighestElement = (elements: readonly HTMLElement[]) =>
  elements.reduce<HTMLElement | null>((collector, htmlElement) => {
    if (!collector) {
      return htmlElement
    }

    if (
      collector.compareDocumentPosition(htmlElement) &
      Node.DOCUMENT_POSITION_FOLLOWING
    ) {
      return htmlElement
    }

    return collector
  }, null)

export const useRunningHeader = (selector: string) => {
  const [highestHeader, setHighestHeader] = useState<HTMLElement | null>(null)
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
      setHighestHeader(highestHeader)
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

  return { highestHeader, subscribers, setRunningHeader }
}
