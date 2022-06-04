import type { Noop } from 'src/common/typings/typings'

import { spacer } from 'src/common/constants/constants'

export { fetcher } from './fetcher.utility'
export { shallowEqual } from './shallowEqual.utility'
export { createSafeContext } from './createSafeContext.utility'
export { entries, fromEntries } from './entries.utility'
export { filterObject } from './filterObject.utility'
export { omit } from './omit.utility'
export { mapObject } from './mapObject.utility'
export { formatDateFull } from './date.utility'
export { renameKey } from './renameKey.utility'

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

export const noop = () => {}

export const compact = <TValue>(arr: readonly TValue[]) => arr.filter(Boolean)

export const uppercaseFirst = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)

export const isEmpty = (object: object) => Object.keys(object).length === 0

export const reverseString = (value: string, separator: string) =>
  value.split(separator).reverse().join(separator)

export const blockBatching = (fn: Noop) => setTimeout(fn, 0)

export const exclude = <TValue>(
  from: readonly TValue[],
  exclude: readonly TValue[]
) => from.filter((value) => !exclude.includes(value))

export const pad = (str: string, length: number, char = spacer) =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char)
