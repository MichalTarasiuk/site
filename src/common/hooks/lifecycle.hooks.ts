/* eslint-disable react-hooks/exhaustive-deps -- template for useEffect */
import { useEffect, useRef } from 'react'

import type { DependencyList, EffectCallback } from 'react'

import { isDevelopmentEnvironment } from 'src/common/constants/constants'
import { useForce, useEvent } from 'src/common/hooks/hooks'

const useEffectCallsOnMount = isDevelopmentEnvironment ? 2 : 1

export const useUpdate = (
  effectCallback: EffectCallback,
  dependencyList: DependencyList
) => {
  const hasMounted = useHasMounted()
  const stableEffectCallback = useEvent(effectCallback, [effectCallback])

  useEffect(() => {
    if (hasMounted) {
      return stableEffectCallback()
    }
  }, dependencyList)
}

export const useUnMount = (cleanUpEffect: ReturnType<EffectCallback>) => {
  const effectCalls = useRef(0)

  useEffect(() => {
    effectCalls.current++

    if (effectCalls.current === useEffectCallsOnMount) {
      return cleanUpEffect
    }
  }, [])
}

export const useMount = (effectCallback: EffectCallback) => {
  const effectCalls = useRef(0)

  useEffect(() => {
    effectCalls.current++

    if (effectCalls.current === useEffectCallsOnMount) {
      return effectCallback()
    }
  }, [])
}

export const useHasMounted = () => {
  const hasMounted = useRef(false)

  useMount(() => {
    hasMounted.current = true
  })

  return hasMounted.current
}

export const usePostponePainting = (fn: (postponse: Noop) => void) => {
  const canCall = useRef(true)
  const force = useForce()

  if (canCall.current) {
    canCall.current = false

    fn(force)
  }
}
