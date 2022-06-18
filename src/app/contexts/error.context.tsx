import { useCallback, useMemo } from 'react'

import type { ReactNode } from 'react'

import { useMount } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'

type Props = {
  readonly children: ReactNode
}

type Listener = (error: Error) => void

type ErrorContextValue = {
  readonly subscribe: (listener: Listener) => Noop
  readonly catchError: (possibleError: unknown) => void
}

const isError = (value: unknown): value is Error => value instanceof Error

const [ErrorProviderImpl, useErrorImpp] =
  createSafeContext<ErrorContextValue>('error')

const ErrorProvider = ({ children }: Props) => {
  const subscribers = useMemo(() => new Set<Listener>(), [])

  const catchError: ErrorContextValue['catchError'] = useCallback(
    (possibleError) => {
      if (isError(possibleError)) {
        subscribers.forEach((subscriber) => subscriber(possibleError))
      }
    },
    [subscribers]
  )

  const subscribe: ErrorContextValue['subscribe'] = useCallback(
    (subscriber) => {
      subscribers.add(subscriber)

      return () => {
        subscribers.delete(subscriber)
      }
    },
    [subscribers]
  )

  const value = useMemo(
    () => ({
      catchError,
      subscribe,
    }),
    [catchError, subscribe]
  )

  return <ErrorProviderImpl value={value}>{children}</ErrorProviderImpl>
}

const useError = (listener?: Listener) => {
  const context = useErrorImpp()

  const { subscribe, ...restContext } = context

  useMount(() => {
    if (listener) {
      const unsubscribe = subscribe(listener)

      return () => {
        unsubscribe()
      }
    }
  })

  return restContext
}

export { useError, ErrorProvider }
