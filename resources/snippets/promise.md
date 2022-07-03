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

type ResolvedResult<TResolved> = [value: TResolved, error: undefined];
type RejectedResult<TError> = [value: undefined, error: TError];
type Result<TResolved, TError> =
  | ResolvedResult<TResolved>
  | RejectedResult<TError>;

const settled = async <TResolved, TError>(
  promise: Promise<TResolved>
): Promise<Result<TResolved, TError>> => {
  try {
    return [await promise, undefined];
  } catch (error: unknown) {
    return [undefined, error as TError];
  }
};
```
