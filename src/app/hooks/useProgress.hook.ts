import { useRouter } from 'next/router'
import NProgress, { start, done } from 'nprogress'
import { useRef } from 'react'

import { useMount } from 'src/common/hooks/hooks'
import { areHookInputsEqual } from 'src/common/hooks/hooks.helpers'

export const useProgress = <
  TOptions extends Partial<NProgress.NProgressOptions>
>(
  options: TOptions
) => {
  const router = useRouter()
  const savedOptions = useRef<TOptions | null>(null)

  if (
    !areHookInputsEqual(
      Object.values(options),
      savedOptions.current && Object.values(savedOptions.current)
    )
  ) {
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
