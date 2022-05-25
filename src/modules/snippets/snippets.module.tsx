import Styles from './snippets.module.scss'

import { TagProvider } from 'modules/snippets/contexts/contexts'

const SnippetsPageImpl = () => {
  return <div className={Styles.view}></div>
}

export const SnippetsPage = () => {
  return (
    <TagProvider>
      <SnippetsPageImpl />
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
