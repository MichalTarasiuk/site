// useSave: resolve problem of different dependencies size beetween hooks rerenders

import { useRef } from 'react'

import type { DependencyList } from 'react'

import { useHasMounted } from 'src/common/hooks/hooks'
import { shallowEqual } from 'src/common/utils/utils'

type Factory<TValue> = () => TValue

export const useSafeMemo = <TValue>(
  factory: Factory<TValue>,
  dependencies: DependencyList
) => {
  const savedValue = useRef<TValue | null>(null)
  const savedDependencies = useRef(dependencies)

  const hasMounted = useHasMounted()

  if (!hasMounted || !shallowEqual(dependencies, savedDependencies.current)) {
    savedValue.current = factory()
    savedDependencies.current = dependencies
  }

  return savedValue.current!
}
