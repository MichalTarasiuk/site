---
title: 'safe index'
publishedAt: '24-06-2022'
fileExtension: 'ts'
---

```ts
// Safe string
type SafeString<TPossibleString> = `${TPossibleString & string}`

type Join<
  TArray extends Array<unknown>,
  TSeparator extends string,
  TResult extends string = ''
> = TArray extends [infer First, ...infer Rest]
  ? Join<
      Rest,
      TSeparator,
      TResult extends '' ? First : `${TResult}${TSeparator}${SafeString<First>}`
    >
  : TResult

type Res = Join<['a', 'p', 'p', 'l', 'e'], '-'> // expected to be 'a-p-p-l-e'
type Res1 = Join<['Hello', 'World'], ' '> // expected to be 'Hello World'
type Res2 = Join<['o'], 'u'> // expected to be 'o'

// Safe index
type SafeKeyIndex<
  TKey extends PropertyKey,
  TArray extends readonly unknown[]
> = TKey & keyof TArray

type Zip<
  TKeys extends readonly number[],
  TValues extends readonly unknown[]
> = {
  readonly [key in keyof TKeys]: readonly [
    TKeys[key],
    TValues[SafeKeyIndex<key, TValues>]
  ]
}

type Res4 = Zip<readonly [1, 2], readonly [true, false]> // expected to be [[1, true], [2, false]]
```
