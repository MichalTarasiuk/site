import Styles from './snippets.module.scss'

import type { InferGetStaticPropsType } from 'next'

import { createResourceReader } from 'scripts/resources/createResourceReader.script'
import { useMount } from 'src/common/hooks/hooks'
import { TagProvider, useTag } from 'src/modules/snippets/contexts/contexts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SnippetsPageImpl = (props: Props) => {
  const { setTags } = useTag()

  useMount(() => {
    setTags([])
  })

  return <div className={Styles.view}></div>
}

export const SnippetsPage = (props: Props) => {
  return (
    <TagProvider>
      <SnippetsPageImpl {...props} />
    </TagProvider>
  )
}

export const getStaticProps = () => {
  const snippetsReader = createResourceReader('snippets')

  return {
    props: {},
  }
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
