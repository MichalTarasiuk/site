import { useRef } from 'react'

type Effect = (node: HTMLElement) => void

export const useEnsuredChildNodes = (
  node: HTMLElement | null,
  effect: Effect
) => {
  const canCall = useRef(true)

  if (canCall.current && node?.hasChildNodes()) {
    effect(node)

    canCall.current = false
  }
}
