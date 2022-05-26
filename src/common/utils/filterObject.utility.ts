import { entries, fromEntries } from 'src/common/utils/utils'

export const filterObject = <TObject extends PlainObject>(
  object: TObject,
  fn: (key: keyof TObject, value: TObject[keyof TObject]) => boolean
) => fromEntries(entries(object).filter(([key, value]) => fn(key, value)))
