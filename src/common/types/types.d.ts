type Noop = () => void

type PlainObject = Record<PropertyKey, unknown>

type LookUp<
  TElement extends { readonly type: string },
  TType extends U['type']
> = TElement extends {
  readonly type: TType
}
  ? TElement
  : never

type RenameKey<
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
> = {
  readonly [Key in keyof TObject as Key extends TFrom ? TTo : Key]: TObject[Key]
}

type AddKey<
  TObject extends PlainObject,
  TKey extends PropertyKey,
  TValue extends unknown
> = TObject & Record<TKey, TValue>

type ArrowFunction = (...args: readonly unknown[]) => unknown
