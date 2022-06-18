import { spacer } from 'src/common/constants/constants'

export const uppercaseFirst = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)

export const reverseString = (value: string, separator: string) =>
  value.split(separator).reverse().join(separator)

export const pad = (str: string, length: number, char = spacer) =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char)
