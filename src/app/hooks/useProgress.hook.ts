import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'
import { useRef } from 'react'

import { useMount } from 'common/hooks/hooks'
import { shallowEqual } from 'common/utils/utils'

export const useProgress = (options: Partial<NProgress.NProgressOptions>) => {
  const router = useRouter()
  const savedOptions = useRef(options)
  const isMounted = useRef(false)

  if (isMounted && !shallowEqual(savedOptions.current, options)) {
    NProgress.configure(options)

    savedOptions.current = options
  }

  useMount(() => {
    isMounted.current = true
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
