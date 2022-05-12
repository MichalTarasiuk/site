import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'
import { useRef } from 'react'

import { useMount } from 'common/hooks/hooks'

const shallowEqual = (a: PlainObject, b: PlainObject) => {
  const keys = Object.keys(a)

  if (keys.length !== Object.keys(b).length) {
    return false
  }

  for (const key in a) {
    if (a[key] !== b[key]) {
      return false
    }
  }

  return true
}

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
