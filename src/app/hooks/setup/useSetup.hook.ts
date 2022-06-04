import { useRouter } from 'next/router'

import { pageview as gtagPreview } from './gtag'

import {
  isClientEnvironment,
  isProduction,
} from 'src/common/constants/constants'
import { useMount } from 'src/common/hooks/hooks'

export const useSetup = () => {
  const router = useRouter()

  useMount(() => {
    if (isClientEnvironment && isProduction) {
      const routeChangeHandler = (url: string) => {
        gtagPreview(url)
      }

      router.events.on('routeChangeComplete', routeChangeHandler)
      router.events.on('hashChangeComplete', routeChangeHandler)

      return () => {
        router.events.off('routeChangeComplete', routeChangeHandler)
        router.events.off('hashChangeComplete', routeChangeHandler)
      }
    }
  })
}
