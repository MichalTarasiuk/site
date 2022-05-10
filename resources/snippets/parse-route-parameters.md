---
title: 'parse-route-parameters'
publishedAt: '10-05-2022'
fileEextension: 'ts'
---

```ts
type ParseRouteParameters<Route> =
  Route extends `${string}/:${infer Param}/${infer Rest}`
    ? { [Entry in Param | keyof ParseRouteParameters<`/${Rest}`>]: string }
    : Route extends `${string}/:${infer Param}`
    ? { [Entry in Param]: string }
    : {}

type X = ParseRouteParameters<'/api/:what/:is/notyou/:happening'>

// type X = {
//   what: string,
//   is: string,
//   happening: string,
// }
```
