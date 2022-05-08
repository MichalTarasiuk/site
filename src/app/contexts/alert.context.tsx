import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'

import type { ReactNode } from 'react'

import { useError } from 'app/contexts/contexts'
import { useTimeout } from 'common/hooks/hooks'

type Props = {
  readonly children: ReactNode
}

type ErrorContextSubscriber = Exclude<Parameters<typeof useError>[0], undefined>
type AlertType = 'success' | 'error' | 'warning'
type AlertState =
  | { readonly type: 'success'; readonly data: string }
  | {
      readonly type: 'error'
      readonly data: Parameters<ErrorContextSubscriber>[0]
    }
  | { readonly type: 'warning'; readonly data: string }
type AlertContextValue = {
  readonly showAlert: <TType extends AlertType>(
    type: TType,
    data: LookUp<AlertState, TType>['data']
  ) => void
  readonly alertState: AlertState | null
  readonly hideAlert: Noop
}

const TIMEOUT = 3000

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

const AlertProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null)

  const hideAlert = useCallback(() => {
    setAlertState(null)
  }, [])

  const showAlert = useCallback(
    <TType extends AlertType>(
      type: TType,
      data: LookUp<AlertState, TType>['data']
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- no idea...
      // @ts-ignore
      setAlertState({ type, data })
    },
    []
  )

  useError((error) => {
    showAlert('error', error)
  })

  useTimeout(hideAlert, alertState && TIMEOUT)

  const value = useMemo(
    () => ({
      alertState,
      hideAlert,
      showAlert,
    }),
    [alertState, hideAlert, showAlert]
  )

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- no idea...
  // @ts-ignore
  return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}

const useAlert = () => {
  const context = useContext(AlertContext)

  if (context === undefined) {
    throw new Error('useAlert must be used within a AlertProvider')
  }

  return context
}

export { AlertProvider, useAlert }
