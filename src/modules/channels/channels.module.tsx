import type { InferGetStaticPropsType, GetStaticPaths } from 'next'

import { createFeedReader } from 'scripts/scripts'
import { omit } from 'src/common/utils/utils'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const ChannelsPage = ({ channels }: Props) => {
  console.log(channels)

  return null
}

export const getStaticProps = async () => {
  const { getAllChannels } = await createFeedReader()

  const channels = Object.values(getAllChannels())
  const formatedCahnnels = channels.map((channel) =>
    omit(channel, ['lastBuildDate', 'items', 'generator'])
  )

  return {
    props: {
      channels: formatedCahnnels,
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
})
