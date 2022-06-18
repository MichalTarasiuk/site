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
