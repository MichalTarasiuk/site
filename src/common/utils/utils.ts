export { fetcher } from './fetcher.utility'
export { shallowEqual } from './shallowEqual.utility'
export { createSafeContext } from './createSafeContext.utility'
export { entries, fromEntries } from './entries.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export const noop = () => {}

export const compact = <TValue>(arr: readonly TValue[]) => arr.filter(Boolean)

export const uppercaseFirst = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)
