/* eslint-disable react-hooks/exhaustive-deps -- template for useEffect */
import { useEffect, useRef } from 'react'

import type { DependencyList, EffectCallback } from 'react'

export const useUpdate = (
  effectCallback: EffectCallback,
  dependencyList: DependencyList
) => {
  const isMounted = useRef(false)
  const savedEffectCallback = useRef(effectCallback)

  if (isMounted && savedEffectCallback.current !== effectCallback) {
    savedEffectCallback.current = effectCallback
  }

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = true
      return
    }

    return savedEffectCallback.current()
  }, dependencyList)
}
