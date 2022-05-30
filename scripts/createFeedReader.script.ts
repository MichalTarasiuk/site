import { XMLParser } from 'fast-xml-parser'

import type { RenameKey } from 'src/common/utils/utils'

import { fetcher, renameKey, fromEntries } from 'src/common/utils/utils'

type ParsedXml = {
  readonly rss: RSS
}

type ItemRSS = {
  readonly title: string
  readonly description: string
  readonly link: string
  readonly guid: string
  readonly pubDate: string
  readonly 'content:encoded': string
}

type RSS = {
  readonly channel: {
    readonly title: string
    readonly description: string
    readonly link: string
    readonly generator: string
    readonly lastBuildDate: string
    readonly item: readonly ItemRSS[]
  }
}

type FeedReader = {
  readonly getChannel: (
    name: string
  ) => RenameKey<RSS['channel'], 'item', 'items'> | undefined
  readonly getAllChannels: () => Record<
    string,
    RenameKey<RSS['channel'], 'item', 'items'>
  >
}

const path = '/rss.xml'

const URLS = [
  'https://overreacted.io',
  'https://www.zhenghao.io',
  'https://www.joshwcomeau.com',
  'https://kentcdodds.com',
]

const getSecondLevelDomain = (hostname: string) => {
  const secondLevelDomain = hostname.replace(/^www\./, '').split('.')[0]

  return secondLevelDomain
}

export const createFeedReader = (() => {
  const xmlParser = new XMLParser()

  let feedReader: FeedReader | null = null
  const channelsMap = new Map<
    string,
    RenameKey<RSS['channel'], 'item', 'items'>
  >()

  return async () => {
    if (feedReader) {
      return feedReader
    }

    const channels = await Promise.all(
      URLS.map(async (url) => {
        const response = await fetcher(url + path)
        const text = await response.text()

        const parsedXml: ParsedXml = xmlParser.parse(text)

        return renameKey(parsedXml.rss.channel, 'item', 'items')
      })
    )

    channels.forEach((channel) => {
      const { hostname } = new URL(channel.link)
      const secondLevelDomain = getSecondLevelDomain(hostname)

      channelsMap.set(secondLevelDomain, channel)
    })

    const getChannel = (name: string) => {
      return channelsMap.get(name)
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
