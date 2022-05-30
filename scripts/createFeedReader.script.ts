import { XMLParser } from 'fast-xml-parser'

import { fetcher } from 'src/common/utils/utils'

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

const topLevelDomainRegEx = /\.(com|io)/
const getSecondLevelDomain = (hostname: string) =>
  hostname.replace(topLevelDomainRegEx, '')

export const createFeedReader = () => {
  const channelsMap = new Map<string, RSS['channel']>()
  const xmlParser = new XMLParser()

  const fetchChannels = async (...urls: readonly string[]) => {
    const channels = await Promise.all(
      urls.map(async (url) => {
        const response = await fetcher(url + path)
        const text = await response.text()

        const parsedXml: ParsedXml = xmlParser.parse(text)

        return parsedXml.rss.channel
      })
    )

    channels.forEach((channel) => {
      const { hostname } = new URL(channel.link)
      const secondLevelDomain = getSecondLevelDomain(hostname)

      channelsMap.set(secondLevelDomain, channel)
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
