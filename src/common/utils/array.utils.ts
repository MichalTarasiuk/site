export const exclude = <TValue>(
  from: readonly TValue[],
  exclude: readonly TValue[]
) => from.filter((value) => !exclude.includes(value))

export const compact = <TValue>(arr: readonly TValue[]) => arr.filter(Boolean)
