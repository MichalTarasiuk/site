import { filterObject } from 'src/common/utils/utils'

export const omit = <TObject extends PlainObject, TKeys extends keyof TObject>(
  object: TObject,
  keys: readonly TKeys[]
) =>
  filterObject(
    object,
    (key) => !keys.includes(key as TKeys)
  ) as unknown as Omit<TObject, TKeys>
