import { useCallback, useRef } from 'react'

import { useMount } from './useMount.hook'

import type { DependencyList } from 'react'

import { shallowEqual } from 'src/common/utils/utils'

export const useEvent = <TFn extends (...args: readonly any[]) => unknown>(
  fn: TFn,
  dependencyList: DependencyList
) => {
  const savedFn = useRef(fn)
  const savedDependencyList = useRef(dependencyList)
  const isMounted = useRef(false)

  if (
    isMounted.current &&
    !shallowEqual(savedDependencyList.current, dependencyList)
  ) {
    savedFn.current = fn
    savedDependencyList.current = dependencyList
  }

  useMount(() => {
    isMounted.current = true
  })

  return useCallback((params: Parameters<typeof fn>) => {
    return savedFn.current(...params)
  }, []) as unknown as TFn
}
