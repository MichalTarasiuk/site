import { useEffect, useRef } from 'react'

import { useUpdate } from 'src/common/hooks/hooks'

export const useTimeout = (
  fn: ArrowFunction,
  timeout: number | null = null
) => {
  const savedFn = useRef(fn)

  useUpdate(() => {
    savedFn.current = fn
  }, [fn])

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => savedFn.current(), timeout)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [timeout])
}
