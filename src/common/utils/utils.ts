export { fetcher } from './fetcher.utility'
export { shallowEqual } from './shallowEqual.utility'
export { uppercaseFirst } from './uppercaseFirst.utility'
export { createSafeContext } from './createSafeContext.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export const noop = () => {}
