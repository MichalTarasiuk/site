export { fetcher } from './fetcher.utility'
export { shallowEqual } from './shallowEqual.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export const noop = () => {}
