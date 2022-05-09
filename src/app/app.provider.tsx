import {
  ThemeProvider,
  ErrorProvider,
  AlertProvider,
} from './contexts/contexts'

import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return (
    <ErrorProvider>
      <AlertProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AlertProvider>
    </ErrorProvider>
  )
}
