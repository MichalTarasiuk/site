import { useRef } from 'react'

export const usePreviousPersistent = <TValue>(
  value: TValue,
  fn: (value: TValue) => void
) => {
  const hookState = useRef<{
    readonly value: TValue
    readonly previous: TValue | null
  }>({
    value: value,
    previous: null,
  })

  const current = hookState.current.value

  if (value !== current) {
    hookState.current = {
      value: value,
      previous: current,
    }

    fn(value)
  }
}
