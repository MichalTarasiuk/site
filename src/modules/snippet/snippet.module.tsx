import type { GetStaticPaths, GetStaticPropsContext } from 'next'

import { createResourceReader } from 'scripts/scripts'
import { DEFAULT_LOCALE } from 'src/app/contexts/contexts'
import { signs, spacer } from 'src/common/constants/constants'

type Props = InferServerPropsType<typeof getStaticProps>

type ParsedUrlQuery = { readonly snippetSlug: string }

export const SnippetPage = ({ snippet }: Props) => {
  console.log(snippet)

  return null
}

export const getStaticProps = ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (params) {
    const snippetsReader = createResourceReader('snippets')

    const snippetName = params.snippetSlug.replace(/\s/g, spacer)
    const snippet = snippetsReader.getResource(snippetName)

    return {
      props: {
        snippet,
      },
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const snippetsReader = createResourceReader('snippets')

  const snippets = snippetsReader.getAllResources()
  const paths = snippets
    .map(({ meta: { title } }) => title.replace(/\s/g, signs.minus))
    .map((slug) => ({ params: { snippetSlug: slug, locale: DEFAULT_LOCALE } }))

  return {
    paths,
    fallback: false,
  }
}
