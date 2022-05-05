import { useRef } from 'react'

import { useUpdate, useMount } from 'common/hooks/hooks'

type TargetName = 'Window' | 'Document'

type EventMap = {
  readonly window: WindowEventMap
}

type TargetToEventMap<TTarget extends TargetName> = TTarget extends 'Window'
  ? EventMap['window']
  : never

const isBrowser = typeof window !== 'undefined'

export const useEventListener = <
  TTargetName extends TargetName,
  TEventMap extends TargetToEventMap<TTargetName>,
  TType extends Exclude<keyof TEventMap, number | symbol>
>(
  targetName: TTargetName,
  type: TType,
  listener: (event: TEventMap[TType]) => void,
  options?: AddEventListenerOptions | boolean
) => {
  const savedCallback = useRef(listener)

  useUpdate(() => {
    savedCallback.current = listener
  }, [listener])

  useMount(() => {
    if (isBrowser) {
      const targetMap = {
        Window: window,
        Document: document,
      }
      const target = targetMap[targetName]
      const listener = (event: Event) => {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
        savedCallback.current(event as unknown as TEventMap[TType])
      }

      target.addEventListener(type, listener, options)

      return () => {
        target.removeEventListener(type, listener, options)
      }
    }
  })
}
