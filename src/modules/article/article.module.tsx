import type { GetStaticPaths } from 'next'

export const ArticlePage = () => {
  return null
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
