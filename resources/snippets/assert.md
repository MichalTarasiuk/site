---
title: 'assert'
publishedAt: '10-05-2022'
fileEextension: 'ts'
---

```ts
function assert<T>(
  condition: T,
  message
): asserts condition is Exclude<T, null | undefined> {
  if (condition === null || condition === undefined) {
    throw new Error(message)
  }
}
```
