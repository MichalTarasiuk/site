import { useRef } from 'react'

type Effect = (node: HTMLElement) => void

export const useDOM = (node: HTMLElement | null, effect: Effect) => {
  const canCall = useRef(true)

  if (canCall.current && node?.hasChildNodes()) {
    effect(node)

    canCall.current = false
  }
}
