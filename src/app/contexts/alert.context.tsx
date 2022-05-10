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

type AlertType = 'success' | 'error' | 'warning'

type AlertState = { readonly type: AlertType; readonly message: string }

type AlertContextValue = {
  readonly alertState: AlertState | null
  readonly hideAlert: Noop
  readonly showAlert: (type: AlertType, message: string) => void
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined)

const ALERT_TIMEOUT = 3000

const AlertProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null)

  const hideAlert: AlertContextValue['hideAlert'] = useCallback(() => {
    setAlertState(null)
  }, [])

  const showAlert: AlertContextValue['showAlert'] = useCallback(
    (type, message) => {
      setAlertState({ type, message })
    },
    []
  )

  useError((error) => {
    showAlert('error', error.message)
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
