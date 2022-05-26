---
title: 'recursive'
publishedAt: '10-05-2022'
fileExtension: 'ts'
---

```ts
type Recurse<T> = T extends { __rec: unknown } ? Recurse<_Recurse<T>> : T
type _Recurse<T> = T extends { __rec: never }
  ? never
  : T extends { __rec: { __rec: infer U } }
  ? { __rec: _Recurse<U> }
  : T extends { __rec: infer U }
  ? U
  : T

type Repeat<T, N extends number> = Recurse<_Repeat<T, N, []>>
type _Repeat<T, N extends number, A extends T[]> = A['length'] extends N
  ? A
  : { __rec: _Repeat<T, N, [T, ...A]> }

// XS = ["x", ..., "x"] and XS["length"] = 100
type XS = Repeat<'aaa', 5>
```
