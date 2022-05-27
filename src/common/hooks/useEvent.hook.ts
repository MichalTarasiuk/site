import { useCallback, useRef } from 'react'

import type { DependencyList } from 'react'

import { useHasMounted } from 'src/common/hooks/hooks'
import { shallowEqual } from 'src/common/utils/utils'

export const useEvent = <TFn extends (...args: readonly any[]) => unknown>(
  fn: TFn,
  dependencyList: DependencyList
) => {
  const savedFn = useRef(fn)
  const savedDependencyList = useRef(dependencyList)
  const hasMounted = useHasMounted()

  if (
    hasMounted &&
    !shallowEqual(savedDependencyList.current, dependencyList)
  ) {
    savedFn.current = fn
    savedDependencyList.current = dependencyList
  }

  return useCallback((params: Parameters<typeof fn>) => {
    return savedFn.current(...params)
  }, []) as unknown as TFn
}
