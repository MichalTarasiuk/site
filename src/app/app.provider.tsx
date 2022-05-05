import { ThemeProvider } from './contexts/contexts'

import type { ReactNode } from 'react'

type Props = {
  readonly children: ReactNode
}

export const AppProvider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
