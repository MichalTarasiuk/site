import * as Cheerio from 'cheerio'

import { fetcher } from 'src/common/utils/utils'

export const getSecondLevelDomain = (hostname: string) => {
  const secondLevelDomain = hostname.replace(/^www\./, '').split('.')[0]

  return secondLevelDomain
}

const isURL = (url: string) => {
  try {
    new URL(url)

    return true
  } catch {
    return false
  }
}

export const getFeedUrl = async (url: string) => {
  const selector = 'link[rel=alternate]'

  const response = await fetcher(url)
  const html = await response.text()

  const loadedCheerio = Cheerio.load(html)
  const href = loadedCheerio(selector).attr('href')

  if (!href) {
    throw new Error(`Feed not found for ${url}`)
  }

  if (isURL(href)) {
    return href
  }

  return url + href
}
