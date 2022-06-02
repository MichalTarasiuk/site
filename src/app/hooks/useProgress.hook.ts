import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'
import { useRef } from 'react'

import { useMount, useHasMounted } from 'src/common/hooks/hooks'
import { shallowEqual } from 'src/common/utils/utils'

export const useProgress = (options: Partial<NProgress.NProgressOptions>) => {
  const router = useRouter()
  const savedOptions = useRef(options)
  const hasMounted = useHasMounted()

  if (!hasMounted || !shallowEqual(savedOptions.current, options)) {
    NProgress.configure(options)

    savedOptions.current = options
  }

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
