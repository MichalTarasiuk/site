import type { Noop } from 'src/common/typings/typings'

export { fetcher } from './fetcher.utility'
export { reverseString, uppercaseFirst, pad } from './string.utils'
export { compact, exclude } from './array.utils'
export { isFunction } from './type.utils'
export { formatDateFull } from './date.utils'
export {
  renameKey,
  fromEntries,
  entries,
  filterObject,
  omit,
  mapObject,
  objectIs,
  objectKeys,
  isEmpty,
  pick,
} from './object.utils'

export const noop = () => {}

export const blockBatching = (fn: Noop) => setTimeout(fn, 0)
