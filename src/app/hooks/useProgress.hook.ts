import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'

import { useMount, useBeforeFirstMount, useEvent } from 'src/common/hooks/hooks'

export const useProgress = <
  TOptions extends Partial<NProgress.NProgressOptions>
>(
  options: TOptions
) => {
  const router = useRouter()

  useBeforeFirstMount(() => {
    NProgress.configure(options)
  })

  const withProgressBar = useEvent(
    (nextPathname: string) => nextPathname !== router.asPath,
    [router.asPath]
  )

  useMount(() => {
    const onStart = (nextPathname: string) => {
      if (withProgressBar(nextPathname)) {
        start()
      }
    }
    const onDone = () => done()

    router.events.on('routeChangeStart', onStart)
    router.events.on('routeChangeComplete', onDone)
    router.events.on('routeChangeError', onDone)

    return () => {
      router.events.on('routeChangeStart', onStart)
      router.events.on('routeChangeComplete', onDone)
      router.events.on('routeChangeError', onDone)
    }
  })
}
