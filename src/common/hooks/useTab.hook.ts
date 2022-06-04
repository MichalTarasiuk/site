import { useMemo, useCallback } from 'react'

import { isClientEnvironment } from 'src/common/constants/constants'
import { useMount } from 'src/common/hooks/hooks'

const createSafeBroadcastChannel = (name: string) => {
  if (isClientEnvironment) {
    return new BroadcastChannel(name)
  }

  return null
}

export const useTab = (name: string, fn: (message: string) => void) => {
  const broadcastCahnnel = useMemo(
    () => createSafeBroadcastChannel(name),
    [name]
  )

  useMount(() => {
    if (broadcastCahnnel) {
      const listener = (event: MessageEvent<string>) => {
        const message = event.data

        fn(message)
      }

      broadcastCahnnel.addEventListener('message', listener)

      const cleanup = () => {
        broadcastCahnnel.removeEventListener('message', listener)
      }

      return () => {
        cleanup()
      }
    }
  })

  const postMessage = useCallback(
    (message: string) => {
      if (broadcastCahnnel) {
        broadcastCahnnel.postMessage(message)
      }
    },
    [broadcastCahnnel]
  )

  return { postMessage }
}
