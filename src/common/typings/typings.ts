export type Noop = () => void

export type PlainObject = Record<PropertyKey, unknown>

export type LookUp<
  TElement extends { readonly type: string },
  TType extends TElement['type']
> = TElement extends {
  readonly type: TType
}
  ? TElement
  : never

export type RenameKey<
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
> = {
  readonly [Key in keyof TObject as Key extends TFrom ? TTo : Key]: TObject[Key]
}

export type AddKey<
  TObject extends PlainObject,
  TKey extends PropertyKey,
  TValue extends unknown
> = TObject & Record<TKey, TValue>

export type ArrowFunction = (...args: readonly unknown[]) => unknown
