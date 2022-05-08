import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import { useUpdate, useMount, useTimeout } from 'common/hooks/hooks'
import { ResponseError } from 'common/utils/fetcher.utility'

type Props = {
  readonly children: ReactNode
}

type Noop = () => void
type ErrorUnion =
  | {
      readonly name: 'ResponseError'
      readonly message: string
      readonly status: number | undefined
    }
  | { readonly name: 'Error'; readonly message: string }
type ErrorCallback = (error: ErrorUnion) => void
type ErrorContextValue = {
  readonly error: ErrorUnion | null
  readonly catchError: (possibleError: unknown) => void
  readonly setErrorCallback: (errorCallback: ErrorCallback) => Noop
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

const ERROR_TIMEOUT = 3000

const isError = (value: unknown): value is Error => value instanceof Error
const isResponseError = (value: unknown): value is ResponseError =>
  value instanceof ResponseError

const unpackError = (error: Error): ErrorUnion => {
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
  const [error, setError] = useState<ErrorUnion | null>(null)
  const errorsCallbacks = useMemo(() => new Set<ErrorCallback>(), [])

  const catchError = useCallback((possibleError: unknown) => {
    if (isError(possibleError)) {
      const unpackedError = unpackError(possibleError)

      setError(unpackedError)
    }
  }, [])

  const reportError = useCallback(
    (error: ErrorUnion) => {
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

  useTimeout(() => {
    setError(null)
  }, ERROR_TIMEOUT)

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

  useMount(() => {
    const removeErrorCallback = setErrorCallback(errorCallback)

    return () => {
      removeErrorCallback()
    }
  })

  return restOfContext
}

export { useError, ErrorProvider }
