// useSafeMemo: resolve problem of different dependencies size between hooks rerenders

import { useRef } from 'react'

import type { DependencyList } from 'react'

import { areHookInputsEqual } from 'src/common/hooks/hooks.helpers'

const customAreHookInputsEqual = (
  nextDeps: ReadonlyArray<unknown>,
  prevDeps: ReadonlyArray<unknown> | null
) =>
  areHookInputsEqual(nextDeps, prevDeps) &&
  nextDeps.length === (prevDeps || []).length

export const useSafeMemo = <TData>(
  nextCreate: () => TData,
  dependencies: DependencyList
) => {
  const savedData = useRef<TData | null>(null)
  const savedDependencies = useRef<DependencyList | null>(null)

  if (!customAreHookInputsEqual(dependencies, savedDependencies.current)) {
    savedData.current = nextCreate()
    savedDependencies.current = dependencies
  }

  return savedData.current!
}
