export const uppercaseFirst = (value: string) =>
  value.slice(0, 1).toUpperCase() + value.slice(1)

export const reverseString = (value: string, separator: string) =>
  value.split(separator).reverse().join(separator)
