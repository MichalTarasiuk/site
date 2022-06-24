---
title: 'typescript utils'
publishedAt: '24-06-2022'
fileExtension: 'ts'
---

```ts
type RemoveOne<TArray extends readonly unknown[]> = TArray extends readonly [
  unknown,
  ...infer Rest
]
  ? Rest
  : readonly []
```
