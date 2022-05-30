import { XMLParser } from 'fast-xml-parser'

import type { RenameKey } from 'src/common/utils/utils'

import { fetcher, renameKey } from 'src/common/utils/utils'

const path = '/rss.xml'

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

export const createFeedReader = (() => {
  const channelsMap = new Map<
    string,
    RenameKey<RSS['channel'], 'item', 'items'>
  >()
  const xmlParser = new XMLParser()

  return () => {
    const fetchChannels = async (...urls: readonly string[]) => {
      const channels = await Promise.all(
        urls.map(async (url) => {
          const response = await fetcher(url + path)
          const text = await response.text()

          const parsedXml: ParsedXml = xmlParser.parse(text)

          return renameKey(parsedXml.rss.channel, 'item', 'items')
        })
      )

      channels.forEach((channel) => {
        const { hostname } = new URL(channel.link)

        channelsMap.set(hostname, channel)
      })

      return channels
    }

    const getChannel = (name: string) => {
      return channelsMap.get(name)
    }

    return {
      fetchChannels,
      getChannel,
    }
  }
})()
