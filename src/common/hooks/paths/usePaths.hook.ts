import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { createPaths } from './usePaths.helpers'

import { useRegion } from 'src/app/contexts/contexts'
import { compact } from 'src/common/utils/utils'

export const usePaths = () => {
  const { locale } = useRegion()
  const router = useRouter()

  const paths = useMemo(() => createPaths(locale), [locale])

  const pathname = useMemo(
    () => `/${compact(router.pathname.split('/')).slice(1).join('/')}`,
    [router.pathname]
  )

  return { paths, pathname }
}
