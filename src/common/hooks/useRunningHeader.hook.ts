import { useState, useCallback, useMemo } from 'react'

import { useObserver } from 'common/hooks/hooks'

const observerInit = {
  threshold: 1,
}

const gethighestElement = (elements: readonly HTMLElement[]) =>
  elements.reduce<HTMLElement | null>((acc, htmlElement) => {
    if (!acc) {
      return htmlElement
    }

    if (
      acc.compareDocumentPosition(htmlElement) &
      Node.DOCUMENT_POSITION_FOLLOWING
    ) {
      return htmlElement
    }

    return acc
  }, null)

export const useRunningHeader = (selector: string) => {
  const [id, setId] = useState('')
  const currentlyVisibleHeaders = useMemo(() => new Set<HTMLElement>(), [])

  const { observeElement, cleanup } = useObserver(observerInit, (entry) => {
    if (entry.isIntersecting) {
      currentlyVisibleHeaders.add(entry.target as HTMLElement)
    } else {
      currentlyVisibleHeaders.delete(entry.target as HTMLElement)
    }

    const highestHeader = gethighestElement([...currentlyVisibleHeaders])

    if (highestHeader) {
      setId(highestHeader.id)
    }
  })

  const setRunningHeader = useCallback(
    (htmlElement: HTMLElement | null) => {
      if (!htmlElement) {
        setId('')
        cleanup()

        return
      }

      htmlElement
        .querySelectorAll<HTMLElement>(selector)
        .forEach(observeElement)
    },
    [cleanup, observeElement, selector]
  )

  return { id, setRunningHeader }
}
