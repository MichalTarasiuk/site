import '../../public/styles/global.styles.scss'

import type { AppProps } from 'next/app'

import { AppProvider } from 'app/app.provider'
import { DefaultLayout } from 'layouts/layouts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProvider>
  )
}

export default MyApp
