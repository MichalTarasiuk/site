type URL = { readonly hash?: string }

export const createPaths = (locale: string) => ({
  channels: {
    url: (url?: URL) => ({
      pathname: '/[locale]/channels',
      query: { locale },
      hash: url?.hash,
    }),
  },
  channel: {
    slug: (slug: string) => ({
      url: (url?: URL) => ({
        pathname: '/[locale]/channels/[slug]',
        query: { locale, slug },
        hash: url?.hash,
      }),
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
  article: (channelSlug: string) => ({
    slug: (articleSlug: string) => ({
      url: (url?: URL) => ({
        pathname: '/[locale]/channels/[channelSlug]/[articleSlug]',
        query: { locale, channelSlug, articleSlug },
        hash: url?.hash,
      }),
    }),
  }),
  url: (url?: URL) => ({
    pathname: '/[locale]',
    query: { locale },
    hash: url?.hash,
  }),
})
