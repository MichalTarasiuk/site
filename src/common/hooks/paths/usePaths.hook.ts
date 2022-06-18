import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { createPaths } from './usePaths.helpers'

import { useRegion } from 'src/app/contexts/contexts'
import { signs } from 'src/common/constants/constants'
import { compact } from 'src/common/utils/utils'

export const usePaths = () => {
  const { locale } = useRegion()
  const router = useRouter()

  const paths = useMemo(() => createPaths(locale), [locale])

  const pathname = useMemo(
    () =>
      `/${compact(router.asPath.split(signs.slash))
        .slice(1)
        .join(signs.slash)}`,
    [router.asPath]
  )

  return { paths, pathname }
}
