import Link from 'next/link'
import { useMemo } from 'react'

import Styles from './articlesListing.module.scss'

import type { FormatedChannel } from 'scripts/createFeedReader.script'

import { signs, spacer } from 'src/common/constants/constants'
import { usePaths } from 'src/common/hooks/hooks'

type ArticlesListingProps = {
  readonly channelSlug: string
  readonly articles: FormatedChannel['items']
}

export const ArticlesListing = ({
  channelSlug,
  articles,
}: ArticlesListingProps) => {
  return (
    <ul className={Styles.listingArticles}>
      {articles.map((article) => (
        <li key={article.title}>
          <ListedArticle channelSlug={channelSlug} article={article} />
        </li>
      ))}
    </ul>
  )
}

type ListedArticleProps = {
  readonly channelSlug: string
  readonly article: FormatedChannel['items'][number]
}

const ListedArticle = ({
  channelSlug,
  article: { title, description },
}: ListedArticleProps) => {
  const { paths } = usePaths()

  const articleSlug = useMemo(
    () => title.toLowerCase().replaceAll(spacer, signs.minus),
    [title]
  )

  return (
    <Link href={paths.article(channelSlug).slug(articleSlug).url()}>
      <a className={Styles.link}>
        <article className={Styles.listedArticle}>
          <h2>{title}</h2>
          <p>{description}</p>
        </article>
      </a>
    </Link>
  )
}
