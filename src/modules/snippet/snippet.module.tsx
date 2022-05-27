import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next'

import { createResourceReader } from 'scripts/resources/createResourceReader.script'
import { DEFAULT_LOCALE } from 'src/app/contexts/contexts'
import { signs, spacer } from 'src/common/constants/constants'

type Props = InferGetStaticPropsType<typeof getStaticProps>

type ParsedUrlQuery = { readonly slug: string }

export const SnippetPage = () => {
  return null
}

export const getStaticProps = ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const snippetsReader = createResourceReader('snippets')

  const snippetName = params!.slug.replace(/\s/g, spacer)
  const snippet = snippetsReader.getResource(snippetName)

  return {
    props: {
      snippet,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const snippetsReader = createResourceReader('snippets')
  const snippets = snippetsReader.getAllResources()
  const paths = snippets
    .map(({ meta: { title } }) => title.replace(/\s/g, signs.minus))
    .map((slug) => ({ params: { slug, locale: DEFAULT_LOCALE } }))

  return {
    paths,
    fallback: false,
  }
}
