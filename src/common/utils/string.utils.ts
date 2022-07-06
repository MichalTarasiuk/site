import { isRegExp } from 'src/common/utils/utils'

export const upperCaseFirstLetter = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)

export const reverseString = (value: string, separator: string) =>
  value.split(separator).reverse().join(separator)

export const lowerCaseTheFirstLetter = (word: string) =>
  word[0].toLowerCase() + word.slice(1)

type OrginalReplace = (
  searchValue: string | RegExp,
  replaceValue: string
) => string

// eslint-disable-next-line @typescript-eslint/unbound-method -- reference
const orginalReplaceAll = String.prototype
  .replaceAll as unknown as OrginalReplace
// eslint-disable-next-line @typescript-eslint/unbound-method -- reference
const orginalReplace = String.prototype.replace as unknown as OrginalReplace

const mockReplaceAll = (
  value: string,
  searchValue: string | RegExp,
  replaceValue: string
) => {
  if (isRegExp(searchValue)) {
    return orginalReplace.call(value, searchValue, replaceValue)
  }

  const globalFlag = 'g'
  const regexp = new RegExp(searchValue, globalFlag)

  return orginalReplace.call(value, regexp, replaceValue)
}

export const replaceAll = (
  value: string,
  searchValue: string | RegExp,
  replacer: string
) => {
  const isSafeCall = Boolean(orginalReplaceAll)

  if (isSafeCall) {
    return orginalReplaceAll.call(value, searchValue, replacer)
  }

  return mockReplaceAll(value, searchValue, replacer)
}
