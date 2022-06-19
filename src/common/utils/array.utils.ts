export const exclude = <TValue>(
  from: readonly TValue[],
  exclude: readonly TValue[]
) => from.filter((value) => !exclude.includes(value))

export const compact = <TValue>(arr: readonly TValue[]) => arr.filter(Boolean)

export const ensuredFind = <TArray extends ReadonlyArray<unknown>>(
  array: TArray,
  fn: (item: TArray[number]) => boolean,
  errorMessage: string
) => {
  const item = array.find(fn)

  if (array.includes(item)) {
    return item as TArray[number]
  }

  throw new Error(errorMessage)
}
