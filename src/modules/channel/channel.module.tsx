import type {
  InferGetStaticPropsType,
  GetStaticPaths,
  GetStaticPropsContext,
} from 'next'

import { createFeedReader } from 'scripts/scripts'
import { DEFAULT_LOCALE } from 'src/app/contexts/contexts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

type ParsedUrlQuery = { readonly slug: string }

export const ChannelPage = ({ channel }: Props) => {
  console.log(channel)

  return null
}

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  const { getChannel } = await createFeedReader()

  const channelName = params!.slug
  const channel = getChannel(channelName)

  return {
    props: {
      channel: channel!,
    },
    notFound: channel === undefined,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getAllChannels } = await createFeedReader()

  const channels = getAllChannels()
  const paths = Object.keys(channels).map((slug) => ({
    params: { slug, locale: DEFAULT_LOCALE },
  }))

  return {
    paths,
    fallback: false,
  }
}
