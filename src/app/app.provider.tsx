import {
  ThemeProvider,
  ErrorProvider,
  AlertProvider,
  RegionProvider,
  ProgressProvider,
} from './contexts/contexts'

import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return (
    <ProgressProvider>
      <RegionProvider>
        <ErrorProvider>
          <AlertProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </AlertProvider>
        </ErrorProvider>
      </RegionProvider>
    </ProgressProvider>
  )
}
