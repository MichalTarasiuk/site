/* eslint-disable @typescript-eslint/no-unused-vars -- just ignore */

type FillArray<
  TRange extends number,
  TResult extends ReadonlyArray<unknown> = readonly []
> = TResult['length'] extends TRange
  ? TResult
  : FillArray<TRange, readonly [unknown, ...TResult]>

type RemoveOne<TArray extends readonly unknown[]> = TArray extends readonly [
  unknown,
  ...infer Rest
]
  ? Rest
  : readonly []

type GreaterThan<
  TOne extends number,
  TTwo extends number,
  TArray1 extends readonly unknown[] = FillArray<TOne>,
  TArray2 extends readonly unknown[] = FillArray<TTwo>
> = readonly []

type A = GreaterThan<2, 1> //should be true
type B = GreaterThan<1, 1> //should be false
type C = GreaterThan<10, 100> //should be false
