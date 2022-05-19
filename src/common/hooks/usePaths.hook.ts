import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { useRegion } from 'app/contexts/contexts'
import { compact } from 'common/utils/utils'

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

type URL = { readonly hash?: string }

const createPaths = (locale: string) => ({
  snippets: {
    url: (url?: URL) => ({
      pathname: '/[locale]/snippets',
      query: { locale },
      hash: url?.hash,
    }),
  },
  url: (url?: URL) => ({
    pathname: '/[locale]',
    query: { locale },
    hash: url?.hash,
  }),
})
