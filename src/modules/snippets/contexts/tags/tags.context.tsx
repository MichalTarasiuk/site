import { useMemo, useCallback } from 'react'

import { getTagByFileExtension } from './tags.helpers'

import type { ReactNode } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { useForce, useUpdate, useSafeMemo } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'
import { fromEntries, filterObject, objectKeys } from 'src/common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type TagContextValue = {
  readonly tags: Record<string, boolean>
  readonly toggleTag: (name: string, value?: boolean) => void
  readonly setTags: (snippets: readonly Snippet[]) => void
  readonly toggleAllTags: (...activeTags: readonly string[]) => void
}

const [TagsProviderImpl, useTagsImpl] =
  createSafeContext<TagContextValue>('tags')

const TagsProvider = ({ children }: Props) => {
  const tagsMap = useMemo(() => new Map<string, boolean>(), [])
  const tags: TagContextValue['tags'] = useSafeMemo(
    () => fromEntries([...tagsMap.entries()]),
    [...tagsMap.values()]
  )

  const force = useForce()

  const setTags: TagContextValue['setTags'] = useCallback(
    (snippets) => {
      snippets.forEach(({ meta: { fileExtension } }) => {
        const tag = getTagByFileExtension(fileExtension)
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

  const toggleAllTags: TagContextValue['toggleAllTags'] = useCallback(
    (...tagsToActive: readonly string[]) => {
      tagsMap.forEach((_, name) => {
        const isActive = tagsToActive.includes(name)

        tagsMap.set(name, isActive)
      })

      force()
    },
    [tagsMap, force]
  )

  const value = useMemo(
    () => ({
      tags,
      setTags,
      toggleTag,
      toggleAllTags,
    }),
    [tags, setTags, toggleTag, toggleAllTags]
  )

  return <TagsProviderImpl value={value}>{children}</TagsProviderImpl>
}

const useTags = (fn?: (tags: TagContextValue['tags']) => void) => {
  const tagsImpl = useTagsImpl()

  const activeTags = useMemo(
    () => filterObject(tagsImpl.tags, (_, value) => value),
    [tagsImpl.tags]
  )
  const lengthActiveTags = objectKeys(activeTags).length

  useUpdate(() => {
    if (fn) {
      fn(activeTags)
    }
  }, [lengthActiveTags])

  return tagsImpl
}

export { TagsProvider, useTags }
