import { useMemo } from 'react'

import { useRegion } from 'app/contexts/contexts'

export const usePaths = () => {
  const { locale } = useRegion()

  const paths = useMemo(() => createPaths(locale), [locale])

  return paths
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
