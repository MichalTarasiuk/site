import * as Cheerio from 'cheerio'
import { isTag } from 'domhandler'

import { signs, spacer } from 'src/common/constants/constants'
import { filterObject, mapObject } from 'src/common/utils/utils'

export const getArticleSlug = (title: string) =>
  title.toLowerCase().replaceAll(spacer, signs.minus)

export const removeAttributes = (
  html: string,
  ...attributes: readonly (string | number)[]
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

  return loadedCheerio.html()
}

// space for replaceKeyWithFn

type FromTo<
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
> = {
  readonly from: TFrom
  readonly to: TTo
}

export const replaceKeyWithFn = <
  TObject extends PlainObject,
  TFrom extends keyof TObject,
  TTo extends PropertyKey
>(
  object: TObject,
  { from, to }: FromTo<TObject, TFrom, TTo>,
  fn: (value: TObject[TFrom]) => TObject[TFrom]
) =>
  mapObject(object, (key, value) =>
    key === from ? [to, fn(value as TObject[TFrom])] : [key, value]
  ) as unknown as RenameKey<TObject, TFrom, TTo>
