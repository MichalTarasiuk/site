---
title: 'tuple-to-union-type'
publishedAt: '10-05-2022'
fileEextension: 'ts'
---

```ts
type UnionFromTuple<Tuple extends readonly (string | number | boolean)[]> =
  Tuple[number]

const animals = ['🦙', '🦑', '🐍', '🦘'] as const

type Animal = UnionFromTuple<typeof animals>

// type Animal = '🦙' | '🦑' | '🐍' | '🦘'
```
