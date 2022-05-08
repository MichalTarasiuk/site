import { useEffect, useRef } from 'react'

import { useUpdate } from 'common/hooks/hooks'

const defaultTimeout = 1000

export const useTimeout = (
  handler: Exclude<TimerHandler, string>,
  timeout: number = defaultTimeout
) => {
  const savedHandler = useRef(handler)

  useUpdate(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      savedHandler.current()
    }, timeout)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [timeout])
}
