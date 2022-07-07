declare interface Window {
  // eslint-disable-next-line functional/prefer-readonly-type -- it's mutable
  dataLayer: object[]
}

type InferServerPropsType<TFn extends (...args: any) => any> = Awaited<
  ReturnType<TFn>
> extends infer Temp
  ? Temp extends {
      readonly props: infer Props
    }
    ? Props
    : never
  : never

type Noop = () => void

type PlainFunction<
  TReturnType = unknown,
  TParams extends ReadonlyArray<any> = readonly any[]
> = (...params: TParams) => TReturnType

type PlainObject = Record<PropertyKey, unknown>

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

type InferObjectValues<TObject extends PlainObject> = TObject[keyof TObject]
