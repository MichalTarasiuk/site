import { createContext, useContext, useCallback, useMemo } from 'react'

import type { ReactNode } from 'react'

import { useMount } from 'common/hooks/hooks'
import { ResponseError } from 'common/utils/fetcher.utility'

type Props = {
  readonly children: ReactNode
}

type RecognizedError =
  | {
      readonly name: 'ResponseError'
      readonly message: string
      readonly status: number | undefined
    }
  | { readonly name: 'Error'; readonly message: string }
type Subscriber = (error: ReturnType<typeof readError>) => void
type ErrorContextValue = {
  readonly subscribe: (subscriber: Subscriber) => Noop
  readonly catchError: (possibleError: unknown) => void
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

const readError = (error: Error): RecognizedError => {
  if (error instanceof ResponseError) {
    return {
      name: 'ResponseError',
      message: error.message,
      status: error.status,
    }
  }

  return {
    name: 'Error',
    message: error.message,
  }
}

const ErrorProvider = ({ children }: Props) => {
  const subscribers = useMemo(() => new Set<Subscriber>(), [])

  const catchError = useCallback(
    (possibleError: unknown) => {
      if (possibleError instanceof Error) {
        const error = readError(possibleError)

        subscribers.forEach((subscriber) => subscriber(error))
      }
    },
    [subscribers]
  )

  const subscribe = useCallback(
    (subscriber: Subscriber) => {
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

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

const useError = (subscriber?: Subscriber) => {
  const context = useContext(ErrorContext)

  if (context === undefined) {
    throw new Error('useError must be used within a ErrorProvider')
  }

  const { subscribe, ...restOfContext } = context

  useMount(() => {
    if (subscriber) {
      const unsubscribe = subscribe(subscriber)

      return () => {
        unsubscribe()
      }
    }
  })

  return restOfContext
}

export { useError, ErrorProvider }
