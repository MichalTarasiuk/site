import type { PlainObject, RenameKey } from 'src/common/typings/typings'

import { mapObject } from 'src/common/utils/utils'

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
