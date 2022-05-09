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

type ArrowFunction = (...args: readonly unknown[]) => unknown
