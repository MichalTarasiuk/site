import '../../public/styles/global.styles.scss'

import type { AppProps } from 'next/app'

import { AppProvider } from 'src/app/app.provider'
import { useSetup } from 'src/app/hooks/hooks'

function MyApp({ Component, pageProps }: AppProps) {
  useSetup()

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
