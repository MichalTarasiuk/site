import 'styles/global.scss'

import type { AppProps } from 'next/app'

import { AppProvider } from 'app/app.provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
