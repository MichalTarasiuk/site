import { useState, useCallback, useMemo } from 'react'

import type { ReactNode } from 'react'

import { useError as useErrorEffect } from 'src/app/contexts/contexts'
import { useTimeout, useUpdate } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'

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

const ALERT_TIMEOUT = 3000

const [AlertProviderImpl, useAlert] =
  createSafeContext<AlertContextValue>('alert')

const AlertProvider = ({ children }: Props) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null)
  const timeout = useTimeout(ALERT_TIMEOUT)

  useErrorEffect((error) => {
    showAlert('error', error.message)
  })

  useUpdate(() => {
    if (alertState?.message) {
      timeout.start(hideAlert)
    }
  }, [alertState])

  const hideAlert: AlertContextValue['hideAlert'] = useCallback(() => {
    setAlertState(null)

    timeout.end()
  }, [timeout])

  const showAlert: AlertContextValue['showAlert'] = useCallback(
    (type, message) => {
      setAlertState({ type, message })
    },
    []
  )

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
