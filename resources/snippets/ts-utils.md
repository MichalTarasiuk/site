---
title: 'typescript utils'
publishedAt: '24-06-2022'
fileExtension: 'ts'
---

```ts
type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false
type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true

type IsSubtypeOf<S, P> = S extends P ? true : false;

type NonUnion<TUnion, T2Union extends TUnion = TUnion> = (
  TUnion extends TUnion ? (T2Union extends TUnion ? false : true) : never
) extends false
  ? TUnion
  : never;

type RemoveOne<TArray extends readonly unknown[]> = TArray extends readonly [
  unknown,
  ...infer Rest
]
  ? Rest
  : readonly []


type type IsTuple<TArray extends ReadonlyArray<unknown>> =
  number extends TArray['length'] ? false : true

type Nominal<TObject, TKey extends string> = TObject & { readonly __tag: TKey };
```
