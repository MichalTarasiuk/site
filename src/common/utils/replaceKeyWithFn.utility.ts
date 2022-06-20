import { mapObject } from 'src/common/utils/utils'

type FromTo<
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
> = {
  readonly from: TFrom
  readonly to: TTo
}

export const replaceKeyWithFn = <
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
>(
  object: TObject,
  { from, to }: FromTo<TObject, TFrom, TTo>,
  fn: (value: TObject[TFrom]) => TObject[TFrom]
) =>
  mapObject(object, (key, value) =>
    key === from ? [to, fn(value as TObject[TFrom])] : [key, value]
  ) as unknown as RenameKey<TObject, TFrom, TTo>
