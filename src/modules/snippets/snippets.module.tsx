import { useIntl } from 'react-intl'

import Styles from './snippets.module.scss'

import type { InferGetStaticPropsType, GetStaticPaths } from 'next'

import { createResourceReader } from 'scripts/scripts'
import { usePostponePainting } from 'src/common/hooks/lifecycle.hooks'
import { pick } from 'src/common/utils/utils'
import { DefaultLayout } from 'src/layouts/layouts'
import { messages } from 'src/locales/translations'
import {
  Tags,
  SnippetsListing,
} from 'src/modules/snippets/components/components'
import { TagsProvider, useTags } from 'src/modules/snippets/contexts/contexts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SnippetsPageImpl = ({ snippets }: Props) => {
  const intl = useIntl()
  const setTags = useTags((contextValue) => contextValue.setTags)

  usePostponePainting((postponse) => {
    setTags(snippets, postponse)
  })

  return (
    <DefaultLayout title={intl.formatMessage(messages.snippets)}>
      <div className={Styles.wrapper}>
        <Tags />
        <SnippetsListing snippets={snippets} />
      </div>
    </DefaultLayout>
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
