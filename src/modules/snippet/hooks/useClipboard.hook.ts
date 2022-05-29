import Copy from 'copy-to-clipboard'
import { useState, useCallback } from 'react'

import { useTimeout } from 'src/common/hooks/hooks'

type Settings = {
  readonly successDuration: number
}

export const useClipboard = (settings: Settings) => {
  const [isCopied, setIsCopied] = useState(false)
  const timeout = useTimeout(settings.successDuration)

  const copy = useCallback(
    (text: string) => {
      const didCopy = Copy(text)

      setIsCopied(didCopy)

      timeout.start(() => setIsCopied(false))
    },
    [timeout]
  )

  return [isCopied, copy] as const
}
