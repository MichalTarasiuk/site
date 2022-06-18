/* eslint-disable react-hooks/exhaustive-deps -- template for useEffect */
import { useEffect, useRef, useLayoutEffect } from 'react'

import type { DependencyList, EffectCallback } from 'react'

import {
  isClientEnvironment,
  isDevelopmentEnvironment,
} from 'src/common/constants/constants'

const useEffectCallsOnMount = isDevelopmentEnvironment ? 2 : 1

export const useUpdate = (
  effectCallback: EffectCallback,
  dependencyList: DependencyList
) => {
  const isMounted = useRef(false)
  const effectCalls = useRef(0)
  const savedEffectCallback = useRef(effectCallback)

  if (isMounted && savedEffectCallback.current !== effectCallback) {
    savedEffectCallback.current = effectCallback
  }

  useEffect(() => {
    effectCalls.current++

    if (!isMounted.current && effectCalls.current === useEffectCallsOnMount) {
      isMounted.current = true
      return
    }

    if (isMounted.current) {
      return savedEffectCallback.current()
    }
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

export const useBeforeFirstMount = (fn: Noop) => {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    fn()
  }
}

const useIsomorphicEffect = isClientEnvironment ? useLayoutEffect : useEffect

export const useBeforeFirstPaint = (effect: EffectCallback) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps -- should call only once
  useIsomorphicEffect(effect, [])
}
