import Styles from './channel.module.scss'

import type { GetStaticPaths, GetStaticPropsContext } from 'next'

import { createFeedReader } from 'scripts/scripts'
import { DEFAULT_LOCALE } from 'src/app/contexts/contexts'
import { objectKeys } from 'src/common/utils/utils'
import { DefaultLayout } from 'src/layouts/layouts'
import { ArticlesListing } from 'src/modules/channel/components/components'

type Props = InferServerPropsType<typeof getStaticProps>

type ParsedUrlQuery = { readonly channelSlug: string }

export const ChannelPage = ({ channel }: Props) => {
  return (
    <DefaultLayout title={channel.title} subtitle={channel.description}>
      <div className={Styles.wrapper}>
        <ArticlesListing channelSlug={channel.slug} articles={channel.items} />
      </div>
    </DefaultLayout>
  )
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (params) {
    const { getChannel } = await createFeedReader()

    const channelName = params.channelSlug
    const channel = getChannel(channelName)

    return {
      props: {
        channel: channel!,
      },
      notFound: channel === undefined,
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllChannels } = await createFeedReader()

  const channels = getAllChannels()
  const paths = objectKeys(channels).map((slug) => ({
    params: { channelSlug: slug, locale: DEFAULT_LOCALE },
  }))

  return {
    paths,
    fallback: false,
  }
}
