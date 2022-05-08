import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import { useUpdate, useUnMount, useTimeout } from 'common/hooks/hooks'
import { ResponseError } from 'common/utils/fetcher.utility'

type Props = {
  readonly children: ReactNode
}

type Noop = () => void
type MyError =
  | {
      readonly name: 'ResponseError'
      readonly message: string
      readonly status: number | undefined
    }
  | { readonly name: 'Error'; readonly message: string }
type ErrorCallback = (error: MyError) => void
type ErrorContextValue = {
  readonly error: MyError | null
  readonly catchError: (possibleError: unknown) => void
  readonly setErrorCallback: (errorCallback: ErrorCallback) => Noop
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

const errorTimeout = 3000

const isError = (value: unknown): value is Error => value instanceof Error
const isResponseError = (value: unknown): value is ResponseError =>
  value instanceof ResponseError

const unpackError = (error: Error): MyError => {
  if (isResponseError(error)) {
    return {
      name: 'ResponseError',
      message: error.message,
      status: error.status,
    } as const
  }

  return { name: 'Error', message: error.message } as const
}

const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState<MyError | null>(null)
  const errorsCallbacks = useMemo(() => new Set<ErrorCallback>(), [])

  const catchError = useCallback((possibleError: unknown) => {
    if (isError(possibleError)) {
      const unpackedError = unpackError(possibleError)

      setError(unpackedError)
    }
  }, [])

  const reportError = useCallback(
    (error: MyError) => {
      errorsCallbacks.forEach((errorCallback) => {
        errorCallback(error)
      })
    },
    [errorsCallbacks]
  )

  const setErrorCallback = useCallback(
    (errorCallback: ErrorCallback) => {
      errorsCallbacks.add(errorCallback)

      return () => {
        errorsCallbacks.delete(errorCallback)
      }
    },
    [errorsCallbacks]
  )

  const resetError = useCallback(() => {
    setError(null)
  }, [setError])

  useTimeout(resetError, errorTimeout)

  useUpdate(() => {
    if (error) {
      reportError(error)
    }
  }, [error])

  const value = useMemo(
    () => ({
      error,
      catchError,
      setErrorCallback,
    }),
    [error, catchError, setErrorCallback]
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

const useError = (
  errorCallback: ErrorCallback
): Omit<ErrorContextValue, 'setErrorCallback'> => {
  const context = useContext(ErrorContext)

  if (context === undefined) {
    throw new Error('useError must be used within a ErrorProvider')
  }

  const { setErrorCallback, ...restOfContext } = context
  const removeErrorCallback = setErrorCallback(errorCallback)

  useUnMount(() => {
    removeErrorCallback()
  })

  return restOfContext
}

export { useError, ErrorProvider }
