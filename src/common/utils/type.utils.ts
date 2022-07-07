/* eslint-disable @typescript-eslint/restrict-plus-operands -- ignore */
import { lowerCaseTheFirstLetter } from 'src/common/utils/utils'

const getType = (value: unknown) => {
  const type = typeof value

  if (type !== 'object') {
    return type
  }

  return lowerCaseTheFirstLetter(
    Object.prototype.toString.call(value).replace(/^\[object (\S+)\]$/, '$1')
  )
}

export const isFunction = (value: unknown): value is PlainFunction =>
  getType(value) === 'function'

export const isRegExp = (value: unknown): value is RegExp =>
  getType(value) === 'regexp'

export const isArray = (value: unknown): value is ReadonlyArray<unknown> =>
  Array.isArray(value)

export const isPlainObject = (value: unknown): value is PlainObject =>
  getType(value) === 'object'
