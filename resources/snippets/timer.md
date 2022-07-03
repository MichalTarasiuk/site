---
title: 'timer'
publishedAt: '4-07-2022'
fileExtension: 'ts'
---

```ts
const DELAY_RESOLVED_VALUE = Symbol('DELAY_RESOLVED_VALUE');

const setTimer = (delay: number) => {
  let timer: NodeJS.Timeout | null = null;

  const promise = new Promise<typeof DELAY_RESOLVED_VALUE>((resolve) => {
    timer = setTimeout(() => {
      resolve(DELAY_RESOLVED_VALUE);
    }, delay);
  });

  return [timer!, promise] as const;
};

const setRace = async <TResolved>(
  promise: Promise<TResolved>,
  delay: number
) => {
  const [timer, timerPromise] = setTimer(delay);

  const resolved = await Promise.race([promise, timerPromise]).finally(() => {
    clearTimeout(timer);
  });

  if (resolved === DELAY_RESOLVED_VALUE) {
    throw Error('timed out');
  }

  return resolved as unknown as Promise<TResolved>;
};
```
