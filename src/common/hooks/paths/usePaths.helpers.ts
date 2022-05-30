type URL = { readonly hash?: string }

export const createPaths = (locale: string) => ({
  channels: {
    url: (url?: URL) => ({
      pathname: '/[locale]/channels',
      query: { locale },
      hash: url?.hash,
    }),
  },
  snippets: {
    url: (url?: URL) => ({
      pathname: '/[locale]/snippets',
      query: { locale },
      hash: url?.hash,
    }),
  },
  snippet: {
    slug: (slug: string) => ({
      url: (url?: URL) => ({
        pathname: '/[locale]/snippets/[slug]',
        query: { locale, slug },
        hash: url?.hash,
      }),
    }),
  },
  url: (url?: URL) => ({
    pathname: '/[locale]',
    query: { locale },
    hash: url?.hash,
  }),
})
