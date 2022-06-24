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
