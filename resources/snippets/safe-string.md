---
title: 'safe string'
publishedAt: '24-06-2022'
fileExtension: 'ts'
---

```ts
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
```
