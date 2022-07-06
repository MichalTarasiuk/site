---
title: 'higher order'
publishedAt: '04-07-2022'
fileExtension: 'ts'
---

```ts
type PlainFunction<
  TReturnType = unknown,
  TParams extends Array<any> = any[]
> = (...params: TParams) => TReturnType;

const thunkify = <
  TPlainFunction extends PlainFunction,
  TResult = ReturnType<TPlainFunction>
>(
  fn: TPlainFunction
) => {
  let canCall = true;
  let result: TResult | null = null;

  return (...params: Parameters<TPlainFunction>) => {
    if (canCall) {
      result = fn(...params) as TResult;
      canCall = false;
    }

    return result!;
  };
};

const not = (plainFunction: PlainFunction<boolean>) => {
  return (...params: Parameters<typeof plainFunction>) =>
    !plainFunction(...params);
};

const invert = (plainFunction: PlainFunction<number>) => {
  return (...params: Parameters<typeof plainFunction>) =>
    -plainFunction(...params);
};
```
