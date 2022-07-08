import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useCallback, useMemo } from 'react'

import type { ReactNode } from 'react'

import { useMount, useEvent } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'

type Props = {
  readonly children: ReactNode
}

type ProgressContextValue = {
  readonly setPercentage: (percentage: number) => void
}

const PROGRESS_BAR_SPEED = 550
const config = {
  speed: PROGRESS_BAR_SPEED,
}

const [ProgressProviderImpl, useProgress] =
  createSafeContext<ProgressContextValue>('progress')

const ProgressProvider = ({ children }: Props) => {
  const router = useRouter()
  const progressManager = useMemo(() => NProgress.configure(config), [])

  const withProgressBar = useEvent(
    (nextPathname: string) => nextPathname !== router.asPath,
    [router.asPath]
  )

  const setPercentage = useCallback(
    (percentage: number) => {
      progressManager.set(percentage)
    },
    [progressManager]
  )

  useMount(() => {
    const onStart = (nextPathname: string) => {
      if (withProgressBar(nextPathname)) {
        progressManager.start()
      }
    }
    const onDone = () => progressManager.done()

    router.events.on('routeChangeStart', onStart)
    router.events.on('routeChangeComplete', onDone)
    router.events.on('routeChangeError', onDone)

    return () => {
      router.events.on('routeChangeStart', onStart)
      router.events.on('routeChangeComplete', onDone)
      router.events.on('routeChangeError', onDone)
    }
  })

  const value = useMemo(
    () => ({
      setPercentage,
    }),
    [setPercentage]
  )

  return <ProgressProviderImpl value={value}>{children}</ProgressProviderImpl>
}

export { ProgressProvider, useProgress }
