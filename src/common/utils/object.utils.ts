// templates for fix typings of objects

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

export const fromEntries = <
  TArray extends readonly (readonly [PropertyKey, unknown])[]
>(
  array: TArray
) => Object.fromEntries(array) as Record<TArray[number][0], TArray[number][1]>

export const entries = <TObject extends Record<PropertyKey, unknown>>(
  object: TObject
) =>
  Object.entries(object) as readonly (readonly [
    keyof TObject,
    TObject[keyof TObject]
  ])[]

export const filterObject = <TObject extends PlainObject>(
  object: TObject,
  fn: (key: keyof TObject, value: TObject[keyof TObject]) => boolean
) => fromEntries(entries(object).filter(([key, value]) => fn(key, value)))

export const omit = <TObject extends PlainObject, TKeys extends keyof TObject>(
  object: TObject,
  keys: readonly TKeys[]
) =>
  filterObject(
    object,
    (key) => !keys.includes(key as TKeys)
  ) as unknown as Omit<TObject, TKeys>

export const pick = <TObject extends PlainObject, TKeys extends keyof TObject>(
  object: TObject,
  keys: readonly TKeys[]
) =>
  filterObject(object, (key) => keys.includes(key as TKeys)) as unknown as Pick<
    TObject,
    TKeys
  >

export const mapObject = <
  TObject extends PlainObject,
  TResult extends readonly [keyof TObject, TObject[keyof TObject]]
>(
  object: TObject,
  fn: (key: keyof TObject, value: TObject[keyof TObject]) => TResult
) => fromEntries(entries(object).map(([key, value]) => fn(key, value)))

export const objectKeys = <TObject extends Record<PropertyKey, unknown>>(
  object: TObject
) => Object.keys(object) as readonly (keyof TObject)[]

export const hasKey = <TObject extends PlainObject>(
  object: TObject,
  key: PropertyKey
): key is keyof TObject => key in object

export const isEmpty = (object: Record<PropertyKey, unknown>) =>
  objectKeys(object).length === 0

export const objectLength = <TObject extends PlainObject>(object: TObject) =>
  objectKeys(object).length

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */

function is(x: any, y: any) {
  return (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
}

export const objectIs: (x: unknown, y: unknown) => boolean =
  typeof Object.is === 'function' ? Object.is : is
