export { fetcher } from './fetcher.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'
