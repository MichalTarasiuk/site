import { useRef, useCallback } from 'react'

export const useTimeout = (timeout: number | null = null) => {
  const savedTimeout = useRef<NodeJS.Timeout | null>(null)

  const end = useCallback(() => {
    if (savedTimeout.current) {
      clearTimeout(savedTimeout.current)
    }
  }, [])

  const start = useCallback(
    (fn: ArrowFunction) => {
      end()

      if (timeout) {
        savedTimeout.current = setTimeout(() => {
          fn()
          end()
        }, timeout)
      }
    },
    [timeout, end]
  )
  return { start, end }
}
