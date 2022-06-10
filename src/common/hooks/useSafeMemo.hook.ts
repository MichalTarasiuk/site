// useSave: resolve problem of different dependencies size between hooks rerenders

import { useRef } from 'react'

import type { DependencyList } from 'react'

import { useHasMounted } from 'src/common/hooks/hooks'
import { shallowEqual } from 'src/common/utils/utils'

export const useSafeMemo = <TData>(
  factory: () => TData,
  dependencies: DependencyList
) => {
  const savedData = useRef<TData | null>(null)
  const savedDependencies = useRef(dependencies)

  const hasMounted = useHasMounted()

  if (!hasMounted || !shallowEqual(dependencies, savedDependencies.current)) {
    savedData.current = factory()
    savedDependencies.current = dependencies
  }

  return savedData.current!
}
