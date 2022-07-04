---
title: 'enum has'
publishedAt: '4-07-2022'
fileExtension: 'ts'
---

```ts
type EnumItem = string | number;

export type Enum = Readonly<Record<string | number, EnumItem>>;

const lookup = new WeakMap<Enum, ReadonlySet<EnumItem>>();

const enumHas = (_enum: Enum, item: EnumItem) => {
  if (!lookup.has(_enum)) {
    lookup.set(_enum, new Set(Object.values(_enum)));
  }

  const items = lookup.get(_enum)!;

  return items.has(item);
};
```
