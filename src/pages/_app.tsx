import '../../public/styles/global.styles.scss'

import type { AppProps } from 'next/app'

import { AppProvider } from 'src/app/app.provider'
import { useProgress, useSetup } from 'src/app/hooks/hooks'

const PROGRESS_BAR_SPEED = 550

function MyApp({ Component, pageProps }: AppProps) {
  useSetup()
  useProgress({
    speed: PROGRESS_BAR_SPEED,
  })

  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
