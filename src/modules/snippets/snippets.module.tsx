import Styles from './snippets.module.scss'

import type { InferGetStaticPropsType, GetStaticPaths } from 'next'

import { createResourceReader } from 'scripts/scripts'
import { useBeforeFirstPaint } from 'src/common/hooks/hooks'
import { pick } from 'src/common/utils/utils'
import {
  Tags,
  SnippetsListing,
} from 'src/modules/snippets/components/components'
import { TagsProvider, useTags } from 'src/modules/snippets/contexts/contexts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SnippetsPageImpl = ({ snippets }: Props) => {
  const { setTags } = useTags()

  useBeforeFirstPaint(() => {
    setTags(snippets)
  })

  return (
    <div className={Styles.wrapper}>
      <Tags />
      <SnippetsListing snippets={snippets} />
    </div>
  )
}

export const SnippetsPage = (props: Props) => {
  return (
    <TagsProvider>
      <SnippetsPageImpl {...props} />
    </TagsProvider>
  )
}

export const getStaticProps = () => {
  const snippetsReader = createResourceReader('snippets')
  const snippets = snippetsReader
    .getAllResources()
    .map((snippet) => pick(snippet, ['meta']))

  return {
    props: {
      snippets,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
