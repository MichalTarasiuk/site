import { getArticleSlug, removeAttributes } from './article.helpers'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'

import { createFeedReader } from 'scripts/scripts'
import { DEFAULT_LOCALE } from 'src/app/contexts/contexts'
import { entries, ensuredFind, replaceKeyWithFn } from 'src/common/utils/utils'
import { DefaultLayout } from 'src/layouts/layouts'
import { ArticleImpl } from 'src/modules/article/components/components'

type Props = InferServerPropsType<typeof getStaticProps>

type ParsedUrlQuery = {
  readonly channelSlug: string
  readonly articleSlug: string
}

export const ArticlePage = ({
  article: { title, description, content },
}: Props) => {
  return (
    <DefaultLayout title={title} subtitle={description}>
      <ArticleImpl content={content} />
    </DefaultLayout>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  try {
    if (params) {
      const feedReader = await createFeedReader()

      const channel = feedReader.getChannel(params.channelSlug)
      const article = ensuredFind(
        channel.items,
        (item) => getArticleSlug(item.title) === params.articleSlug,
        'article not found'
      )

      const formatedArticle = replaceKeyWithFn(
        article,
        { from: 'content:encoded', to: 'content' },
        (html) => removeAttributes(html, ['class', 'style'])
      )

      return {
        props: {
          article: formatedArticle,
        },
      }
    }

    throw Error('invalid params')
  } catch (error) {
    console.log(error)

    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const feedReader = await createFeedReader()
  const channels = feedReader.getAllChannels()

  const paths = entries(channels).flatMap(
    ([channelSlug, { items: articles }]) =>
      articles.map(({ title }) => ({
        params: {
          locale: DEFAULT_LOCALE,
          channelSlug,
          articleSlug: getArticleSlug(title),
        },
      }))
  )

  return {
    paths,
    fallback: 'blocking',
  }
}
