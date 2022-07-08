import type { Snippet } from 'scripts/resourceReader/resources.types'

import { filterObject } from 'src/common/utils/utils'

const fileExtenstionToTag = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css',
}

export const getTagByFileExtension = (
  fileExtension: keyof typeof fileExtenstionToTag
) => fileExtenstionToTag[fileExtension]

export const countRepeatability = <TItem extends string>(
  array: readonly TItem[]
) =>
  array.reduce((collector, item) => {
    collector[item] ??= 0
    collector[item]++

    return collector
  }, {} as Record<TItem, number>)

export const getActiveTags = <TTags extends PlainObject>(tags: TTags) =>
  filterObject(tags, (_, value) => Boolean(value))

export const getTagsNames = (snippets: readonly Pick<Snippet, 'meta'>[]) =>
  snippets.map(({ meta: { fileExtension } }) =>
    getTagByFileExtension(fileExtension)
  )
