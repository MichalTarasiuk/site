import { mapObject } from 'src/common/utils/utils'

export type RenameKey<
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
> = {
  readonly [Key in keyof TObject as Key extends TFrom ? TTo : Key]: TObject[Key]
}

export const renameKey = <
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
>(
  object: TObject,
  from: TFrom,
  to: TTo
) =>
  mapObject(object, (key, value) => [
    key === from ? to : key,
    value,
  ]) as unknown as RenameKey<TObject, TFrom, TTo>
