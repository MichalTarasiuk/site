import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'

import { useMount, useBeforeFirstMount } from 'src/common/hooks/hooks'

export const useProgress = <
  TOptions extends Partial<NProgress.NProgressOptions>
>(
  options: TOptions
) => {
  const router = useRouter()

  useBeforeFirstMount(() => {
    NProgress.configure(options)
  })

  useMount(() => {
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)

    return () => {
      router.events.on('routeChangeStart', start)
      router.events.on('routeChangeComplete', done)
      router.events.on('routeChangeError', done)
    }
  })
}
