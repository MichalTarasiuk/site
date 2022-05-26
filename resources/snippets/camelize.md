---
title: 'camelize'
publishedAt: '10-05-2022'
fileExtension: 'ts'
---

```ts
// Usage: type CamelCase = CamelizeString<'snake_case'> -> snakeCase
export type CamelizeString<Value> = Value extends string
  ? Value extends `${infer T}_${infer U}`
    ? `${T}${Capitalize<CamelizeString<U>>}`
    : Value
  : Value

type KeyOf<Object extends Record<string, unknown>> = Extract<
  keyof Object,
  string
>

// Usage: type CamelCaseObject = CamelizeObject<{my_name: string}>; -> {myName: string}
export type CamelizeObject<Object extends Record<KeyOf<Object>, unknown>> = {
  [Key in KeyOf<Object> as CamelizeString<Key>]: Object[Key]
}

export type CamelizeObjectDeep<Value> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Array<CamelizeObjectDeep<U>>
  : Value extends Set<infer U>
  ? Set<CamelizeObjectDeep<U>>
  : {
      [K in keyof Value as CamelizeString<K>]: CamelizeObjectDeep<Value[K]>
    }
```
