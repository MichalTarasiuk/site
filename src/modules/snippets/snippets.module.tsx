import Styles from './snippets.module.scss'

import type { InferGetStaticPropsType } from 'next'

import { createResourceReader } from 'scripts/resources/createResourceReader.script'
import { useBeforeFirstPaint } from 'src/common/hooks/hooks'
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
    <div className={Styles.view}>
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
  const snippets = snippetsReader.getAllResources()

  return {
    props: {
      snippets,
    },
  }
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
