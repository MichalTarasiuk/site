import { ThemeProvider, ErrorProvider } from './contexts/contexts'

import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return (
    <ErrorProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ErrorProvider>
  )
}
