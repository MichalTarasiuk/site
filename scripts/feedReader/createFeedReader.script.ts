import { XMLParser } from 'fast-xml-parser'

import { FEED_URLS } from './feedReader.constants'
import { getSecondLevelDomain, getFeedUrl } from './feedReader.helpers'

import type { ParsedXml, FormatedChannel } from './feedReader.types'

import { fetcher, renameKey, fromEntries } from 'src/common/utils/utils'

type FeedReader = {
  readonly getChannel: (name: string) => FormatedChannel
  readonly getAllChannels: () => Record<string, FormatedChannel>
}

export const createFeedReader = (() => {
  const xmlParser = new XMLParser()

  let feedReader: FeedReader | null = null
  const channelsMap = new Map<string, FormatedChannel>()

  return async () => {
    if (feedReader) {
      return feedReader
    }

    const channels = await Promise.all(
      FEED_URLS.map(async (url) => {
        const feedURL = await getFeedUrl(url)
        const response = await fetcher(feedURL)
        const text = await response.text()

        const parsedXml: ParsedXml = xmlParser.parse(text)

        return renameKey(parsedXml.rss.channel, 'item', 'items')
      })
    )

    channels.forEach((channel) => {
      const { hostname } = new URL(channel.link)
      const slug = getSecondLevelDomain(hostname)
      const formatedChannel = { ...channel, slug }

      channelsMap.set(slug, formatedChannel)
    })

    const getChannel = (name: string) => {
      const channel = channelsMap.get(name)

      if (channel) {
        return channel
      }

      throw new Error(`Channel ${name} not found`)
    }

    const getAllChannels = () => {
      return fromEntries([...channelsMap.entries()])
    }

    const reader = {
      getChannel,
      getAllChannels,
    }

    feedReader = reader

    return reader
  }
})()
