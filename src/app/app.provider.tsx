import {
  ThemeProvider,
  ErrorProvider,
  AlertProvider,
  RegionProvider,
} from './contexts/contexts'

import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return (
    <RegionProvider>
      <ErrorProvider>
        <AlertProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AlertProvider>
      </ErrorProvider>
    </RegionProvider>
  )
}
