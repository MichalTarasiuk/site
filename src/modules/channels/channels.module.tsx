import { useIntl } from 'react-intl'

import Styles from './channels.module.scss'

import type { InferGetStaticPropsType, GetStaticPaths } from 'next'

import { createFeedReader } from 'scripts/scripts'
import { omit } from 'src/common/utils/utils'
import { DefaultLayout } from 'src/layouts/layouts'
import { messages } from 'src/locales/translations'
import { ListedChannel } from 'src/modules/channels/components/components'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const ChannelsPage = ({ channels }: Props) => {
  const intl = useIntl()

  return (
    <DefaultLayout title={intl.formatMessage(messages.channels)}>
      <div className={Styles.wrapper}>
        {channels.map((channel) => (
          <ul className={Styles.listing} key={channel.title}>
            <ListedChannel {...channel} />
          </ul>
        ))}
      </div>
    </DefaultLayout>
  )
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
