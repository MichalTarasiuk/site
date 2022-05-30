import { blogsURLS } from './channels.constants'

import type { InferGetStaticPropsType, GetStaticPaths } from 'next'

import { createFeedReader } from 'scripts/scripts'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const ChannelsPage = ({ channels }: Props) => {
  console.log(channels)

  return null
}

export const getStaticProps = async () => {
  const { fetchChannels } = createFeedReader()

  const channels = await fetchChannels(...blogsURLS)

  return {
    props: {
      channels,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
