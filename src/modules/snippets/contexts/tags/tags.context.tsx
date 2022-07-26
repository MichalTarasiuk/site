import { useMemo, useCallback, useRef } from 'react'

import {
  getTagByFileExtension,
  countRepeatability,
  getActiveTags,
  getTagsNames,
} from './tags.helpers'

import type { TagContextValue } from './tags.types'
import type { ReactNode } from 'react'

import { useForce, useUpdate, useSafeMemo } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'
import { fromEntries, objectLength } from 'src/common/utils/utils'

type Props = {
  readonly children: ReactNode
}

const [TagsProviderImpl, useTags] = createSafeContext<TagContextValue>('tags')

const TagsProvider = ({ children }: Props) => {
  const tagsMap = useMemo(() => new Map<string, boolean>(), [])
  const tags = useSafeMemo(
    () => fromEntries([...tagsMap.entries()]),
    [...tagsMap.values()]
  )
  const tagsRepeatability = useRef<ReturnType<typeof countRepeatability>>({})

  const force = useForce()

  const setTags: TagContextValue['setTags'] = useCallback(
    (snippets, fn) => {
      const names = getTagsNames(snippets)

      tagsRepeatability.current = countRepeatability(names)

      snippets.forEach(({ meta: { fileExtension } }) => {
        const tag = getTagByFileExtension(fileExtension)
        const has = tagsMap.has(tag)

        if (!has) {
          tagsMap.set(tag, false)
        }
      })

      fn()
    },
    [tagsMap]
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
      tagsRepeatability: tagsRepeatability.current,
    }),
    [tags, setTags, toggleTag, toggleAllTags]
  )

  return <TagsProviderImpl value={value}>{children}</TagsProviderImpl>
}

const useTagsSelected = (fn?: (tags: TagContextValue['tags']) => void) => {
  const tags = useTags((contextValue) => contextValue.tags)

  const activeTags = useMemo(() => getActiveTags(tags), [tags])
  const lengthActiveTags = useMemo(() => objectLength(activeTags), [activeTags])

  useUpdate(() => {
    if (fn) {
      fn(activeTags)
    }
  }, [lengthActiveTags])
}

export { TagsProvider, useTagsSelected, useTags }
