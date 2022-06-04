import { useRouter } from 'next/router'

import { pageview as gtagPreview } from './gtag'
import { pageview as gtmPreview } from './gtm'

import {
  isClientEnvironment,
  isProductionEnvironment,
} from 'src/common/constants/constants'
import { useMount } from 'src/common/hooks/hooks'

export const useSetup = () => {
  const router = useRouter()

  useMount(() => {
    if (isClientEnvironment && isProductionEnvironment) {
      const routeChangeHandler = (url: string) => {
        gtagPreview(url)
        gtmPreview(url)
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
