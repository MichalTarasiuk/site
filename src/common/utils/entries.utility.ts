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
