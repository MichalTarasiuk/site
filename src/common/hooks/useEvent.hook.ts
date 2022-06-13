// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md

import { useCallback, useRef } from 'react'

import type { DependencyList } from 'react'

import { areHookInputsEqual } from 'src/common/hooks/hooks.helpers'

export const useEvent = <TFn extends (...args: readonly any[]) => unknown>(
  fn: TFn,
  dependencyList: DependencyList
) => {
  const savedFn = useRef(fn)
  const savedDependencyList = useRef<DependencyList | null>(null)

  if (!areHookInputsEqual(dependencyList, savedDependencyList.current)) {
    savedFn.current = fn
    savedDependencyList.current = dependencyList
  }

  return useCallback((params: Parameters<typeof fn>) => {
    return savedFn.current(...params)
  }, []) as unknown as TFn
}
