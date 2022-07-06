import * as Cheerio from 'cheerio'
import { isTag } from 'domhandler'
import { parse } from 'node-html-parser'

import { signs, spacer } from 'src/common/constants/constants'
import { filterObject, replaceAll } from 'src/common/utils/utils'

export const getArticleSlug = (title: string) =>
  replaceAll(title.toLowerCase(), spacer, signs.minus)

export const removeAttributes = (
  html: string,
  attributes: readonly (string | number)[]
) => {
  const selector = '*'
  const loadedCheerio = Cheerio.load(html)

  loadedCheerio(selector).map((_, anyNode) => {
    if (isTag(anyNode)) {
      anyNode.attribs = filterObject(
        anyNode.attribs,
        (key) => !attributes.includes(key)
      )
    }

    return anyNode
  })

  const body = extractBody(loadedCheerio.html())

  return body
}

const extractBody = (htmlAsString: string) => {
  const selector = 'body'

  const root = parse(htmlAsString)
  const body = root.querySelector(selector)

  if (!body) {
    throw new Error(`can not find ${selector} in html`)
  }

  return body.innerHTML
}
