import { entries, fromEntries } from 'src/common/utils/utils'

export const mapObject = <
  TObject extends PlainObject,
  TResult extends readonly [keyof TObject, TObject[keyof TObject]]
>(
  object: TObject,
  fn: (key: keyof TObject, value: TObject[keyof TObject]) => TResult
) => fromEntries(entries(object).map(([key, value]) => fn(key, value)))
