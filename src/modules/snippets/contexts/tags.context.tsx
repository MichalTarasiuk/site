import { useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { useForce, useSafeMemo } from 'src/common/hooks/hooks'
import { createSafeContext, fromEntries, exclude } from 'src/common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type TagContextValue = {
  readonly tags: Record<string, boolean>
  readonly toggleTag: (name: string, value?: boolean) => void
  readonly setTags: (snippets: readonly Snippet[]) => void
  readonly resetTags: (...excludedTags: readonly string[]) => void
}

export const fileExtenstionToTag = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css',
}

const [TagsProviderImpl, useTags] = createSafeContext<TagContextValue>('tags')

const TagsProvider = ({ children }: Props) => {
  const tagsMap = useMemo(() => new Map<string, boolean>(), [])
  const tags: TagContextValue['tags'] = useSafeMemo(() => {
    const formatedTags = fromEntries([...tagsMap.entries()])

    return formatedTags
  }, [tagsMap.size, ...tagsMap.values()])

  const force = useForce()

  const setTags: TagContextValue['setTags'] = useCallback(
    (snippets) => {
      snippets.forEach(({ meta: { fileExtension } }) => {
        const tag = fileExtenstionToTag[fileExtension]
        const has = tagsMap.has(tag)

        if (!has) {
          tagsMap.set(tag, false)
        }
      })

      force()
    },
    [tagsMap, force]
  )

  const toggleTag: TagContextValue['toggleTag'] = useCallback(
    (name, value) => {
      const isActive = tagsMap.get(name)
      const nextValue = value ?? !isActive

      tagsMap.set(name, nextValue)

      force()
    },
    [tagsMap, force]
  )

  const resetTags: TagContextValue['resetTags'] = useCallback(
    (...excludedTags: readonly string[]) => {
      const allTags = [...tagsMap.keys()]
      const selectedTags = exclude(allTags, excludedTags)

      selectedTags.forEach((selectedTag) => tagsMap.set(selectedTag, false))

      force()
    },
    [tagsMap, force]
  )

  const value = useMemo(
    () => ({
      tags,
      setTags,
      resetTags,
      toggleTag,
    }),
    [tags, setTags, toggleTag, resetTags]
  )

  return <TagsProviderImpl value={value}>{children}</TagsProviderImpl>
}

export { TagsProvider, useTags }
