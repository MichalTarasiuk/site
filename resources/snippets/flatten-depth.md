---
title: 'flatten depth'
publishedAt: '24-06-2022'
fileExtension: 'ts'
---

```ts
type AddOne<
  TArray extends readonly unknown[],
  TItem extends TArray[number] = unknown
> = readonly [...TArray, TItem]

type ArrayUnion<TItem extends unknown> = TItem extends readonly unknown[]
  ? TItem[number]
  : TItem

type Flat<
  TArray extends ReadonlyArray<unknown>,
  TResult extends ReadonlyArray<unknown> = readonly []
> = TArray extends readonly [infer First, ...infer Rest]
  ? Flat<Rest, AddOne<TResult, ArrayUnion<First>>>
  : TResult

type FlattenDepth<
  TArray extends readonly unknown[],
  TMaxLevel extends number = 1,
  TLevel extends ReadonlyArray<unknown> = readonly []
> = TLevel['length'] extends TMaxLevel
  ? TArray
  : FlattenDepth<Flat<TArray>, TMaxLevel, AddOne<TLevel>>

type Flatten = FlattenDepth<
  readonly [1, 2, readonly [3], readonly [readonly [readonly [4]]]],
  2
>

const flatten: Flatten = [1, 2, 3, [4]]
```
