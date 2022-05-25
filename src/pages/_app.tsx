import '../../public/styles/global.styles.scss'

import type { AppProps } from 'next/app'

import { AppProvider } from 'src/app/app.provider'
import { useProgress } from 'src/app/hooks/hooks'
import { DefaultLayout } from 'src/layouts/layouts'

const PROGRESS_BAR_SPEED = 550

function MyApp({ Component, pageProps }: AppProps) {
  useProgress({
    speed: PROGRESS_BAR_SPEED,
  })

  return (
    <AppProvider>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </AppProvider>
  )
}

export default MyApp
