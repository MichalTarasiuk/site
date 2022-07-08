import { isArray } from 'src/common/utils/utils'

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

type CastArray<TValue> = readonly (TValue extends ReadonlyArray<unknown>
  ? TValue[number]
  : TValue)[]

export const castArray = <TArray>(value: TArray) =>
  (isArray(value) ? value : [value]) as CastArray<TArray>
