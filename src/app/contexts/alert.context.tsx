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

type ErrorSubscriber = Exclude<Parameters<typeof useError>[0], undefined>
type ErrorData = Parameters<ErrorSubscriber>[0]

type AlertType = 'success' | 'error' | 'warning'
type AlertState =
  | {
      readonly type: 'success'
      readonly data: string
    }
  | { readonly type: 'error'; readonly data: ErrorData }
  | { readonly type: 'warning'; readonly data: string }

type AlertContextValue = {
  readonly alertState: AlertState | null
  readonly hideAlert: Noop
  readonly showAlert: <TType extends AlertType>(
    type: TType,
    data: LookUp<AlertState, TType>['data']
  ) => void
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

const ALERT_TIMEOUT = 3000

const AlertProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null)

  const hideAlert: AlertContextValue['hideAlert'] = useCallback(() => {
    setAlertState(null)
  }, [])

  // @ts-ignore
  const showAlert: AlertContextValue['showAlert'] = useCallback(
    (type, data) => {
      // @ts-ignore
      setAlertState({ type, data })
    },
    []
  )

  useError((error) => {
    showAlert('error', error)
  })

  useTimeout(hideAlert, ALERT_TIMEOUT)

  const value = useMemo(
    () => ({
      alertState,
      hideAlert,
      showAlert,
    }),
    [alertState, hideAlert, showAlert]
  )

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
