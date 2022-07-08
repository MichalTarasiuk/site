export function sum(a: bigint, b: bigint): bigint
export function sum(a: number, b: number): number
export function sum<TDigit extends number>(a: TDigit, b: TDigit): TDigit {
  return (a + b) as TDigit
}
