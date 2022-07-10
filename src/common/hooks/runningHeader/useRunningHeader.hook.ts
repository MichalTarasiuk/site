import { useState, useCallback, useMemo } from 'react'

import { observerInit, getHighestElement } from './useRunningHeader.helpers'

import { useObserver } from 'src/common/hooks/hooks'

export const useRunningHeader = (selector: string) => {
  const [id, setId] = useState<string | null>(null)
  const currentlyVisibleHeaders = useMemo(() => new Set<HTMLElement>(), [])

  const { observeElement, cleanup } = useObserver(observerInit, (entry) => {
    if (entry.isIntersecting) {
      currentlyVisibleHeaders.add(entry.target as HTMLElement)
    } else {
      currentlyVisibleHeaders.delete(entry.target as HTMLElement)
    }

    const highestHeader = getHighestElement([...currentlyVisibleHeaders])

    if (highestHeader) {
      setId(highestHeader.id)
    }
  })

  const setRunningHeader = useCallback(
    (htmlElement: HTMLElement | null) => {
      if (!htmlElement) {
        setId(null)
        cleanup()

        return
      }

      const nodeList = htmlElement.querySelectorAll<HTMLElement>(selector)

      nodeList.forEach(observeElement)
    },
    [cleanup, observeElement, selector]
  )

  return { id, setRunningHeader }
}
