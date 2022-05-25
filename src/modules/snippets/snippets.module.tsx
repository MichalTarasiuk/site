import Styles from './snippets.module.scss'

import type { InferGetStaticPropsType } from 'next'

import { useMount } from 'common/hooks/hooks'
import { TagProvider, useTag } from 'modules/snippets/contexts/contexts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

const SnippetsPageImpl = (props: Props) => {
  const { setInitialTags } = useTag()

  useMount(() => {
    setInitialTags([])
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
  return {
    props: {},
  }
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
