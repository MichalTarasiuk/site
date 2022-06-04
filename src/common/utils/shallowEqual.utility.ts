import type { PlainObject } from 'src/common/typings/typings'

export const shallowEqual = <TA extends PlainObject | readonly unknown[]>(
  a: TA,
  b: TA
) => {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }

  return true
}
