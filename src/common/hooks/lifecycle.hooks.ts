/* eslint-disable react-hooks/exhaustive-deps -- template for useEffect */
import { useEffect, useRef, useLayoutEffect } from 'react'

import type { DependencyList, EffectCallback } from 'react'

import { isClientEnvironment } from 'src/common/constants/constants'

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

export const useUnMount = (cleanUpEffect: ReturnType<EffectCallback>) => {
  useMount(() => cleanUpEffect)
}

export const useMount = (effectCallback: EffectCallback) => {
  useEffect(effectCallback, [])
}

export const useHasMounted = () => {
  const hasMounted = useRef(false)

  useMount(() => {
    hasMounted.current = true
  })

  return hasMounted.current
}

const useIsomorphicEffect = isClientEnvironment ? useLayoutEffect : useEffect

export const useBeforeFirstPaint = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- should call only once
  useIsomorphicEffect(effect, [])
}
