import { useEffect, useRef } from 'react'

import { useUpdate } from 'common/hooks/hooks'

export const useTimeout = (
  handler: Exclude<TimerHandler, string>,
  timeout: number | null = null
) => {
  const savedHandler = useRef(handler)

  useUpdate(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => {
        savedHandler.current()
      }, timeout)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [timeout])
}
