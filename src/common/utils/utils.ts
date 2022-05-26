export { fetcher } from './fetcher.utility'
export { shallowEqual } from './shallowEqual.utility'
export { createSafeContext } from './createSafeContext.utility'
export { entries, fromEntries } from './entries.utility'
export { filterObject } from './filterObject.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export const noop = () => {}

export const compact = <TValue>(arr: readonly TValue[]) => arr.filter(Boolean)

export const uppercaseFirst = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)

export const isEmpty = (object: object) => Object.keys(object).length === 0

export const reverseString = (value: string, separator: string) =>
  value.split(separator).reverse().join(separator)
