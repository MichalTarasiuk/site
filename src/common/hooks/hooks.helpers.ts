import { objectIs } from 'src/common/utils/utils'

export const areHookInputsEqual = (
  nextDeps: ReadonlyArray<unknown>,
  prevDeps: ReadonlyArray<unknown> | null
) => {
  if (prevDeps === null) {
    return false
  }

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (objectIs(nextDeps[i], prevDeps[i])) {
      continue
    }
    return false
  }

  return true
}
