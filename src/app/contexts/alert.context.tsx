import { useState, useCallback, useMemo } from 'react'

import type { ReactNode } from 'react'

import { useError } from 'src/app/contexts/contexts'
import { useTimeout } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/utils/utils'

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

const [AlertProviderImpl, useAlert] =
  createSafeContext<AlertContextValue>('alert')

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

  return <AlertProviderImpl value={value}>{children}</AlertProviderImpl>
}

export { AlertProvider, useAlert }
