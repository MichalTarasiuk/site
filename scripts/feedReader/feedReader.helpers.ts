import * as Cheerio from 'cheerio'

import { fetcher } from 'src/common/utils/utils'

export const getSecondLevelDomain = (hostname: string) => {
  const secondLevelDomain = hostname.replace(/^www\./, '').split('.')[0]

  return secondLevelDomain
}

export const getFeedUrl = async (url: string) => {
  const response = await fetcher(url)
  const html = await response.text()

  const $ = Cheerio.load(html)
  const feedPath = $('link[type="application/rss+xml"]').attr('href')

  if (feedPath) {
    return url + feedPath
  }

  throw new Error(`Feed not found for ${url}`)
}
