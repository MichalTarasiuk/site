import Link from 'next/link'

import Styles from './articlesListing.module.scss'

import type { FormatedChannel } from 'scripts/createFeedReader.script'

import { usePaths } from 'src/common/hooks/hooks'

type ArticlesListingProps = {
  readonly articles: FormatedChannel['items']
}

export const ArticlesListing = ({ articles }: ArticlesListingProps) => {
  return (
    <ul className={Styles.listingArticles}>
      {articles.map((article) => (
        <li key={article.title}>
          <ListedArticle article={article} />
        </li>
      ))}
    </ul>
  )
}

type ListedArticleProps = {
  readonly article: FormatedChannel['items'][number]
}

const ListedArticle = ({ article }: ListedArticleProps) => {
  const paths = usePaths()

  return (
    <Link href="/">
      <a className={Styles.link}>
        <article className={Styles.listedArticle}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
        </article>
      </a>
    </Link>
  )
}
