import { useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { useForce, useSave } from 'src/common/hooks/hooks'
import { createSafeContext, fromEntries } from 'src/common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type TagContextValue = {
  readonly tags: Record<string, boolean>
  readonly toggleTag: (name: string) => void
  readonly setTags: (snippets: readonly Snippet[]) => void
  readonly resetTags: Noop
}

export const fileExtenstionToTag = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css',
}

const [TagProviderImpl, useTag] = createSafeContext<TagContextValue>('tag')

const TagProvider = ({ children }: Props) => {
  const tagsMap = useMemo(() => new Map<string, boolean>(), [])
  const tags: TagContextValue['tags'] = useSave(
    () => {
      const formatedTags = fromEntries([...tagsMap.entries()])

      return formatedTags
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the map object is equated by reference
    [tagsMap.size, ...tagsMap.values()]
  )

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

  const resetTags: TagContextValue['resetTags'] = useCallback(() => {
    const tags = [...tagsMap.keys()]

    tags.forEach((tag) => tagsMap.set(tag, false))

    force()
  }, [tagsMap, force])

  const toggleTag: TagContextValue['toggleTag'] = useCallback(
    (name) => {
      const isActive = tagsMap.get(name)

      if (isActive) {
        tagsMap.set(name, false)
      } else {
        tagsMap.set(name, true)
      }

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

  return <TagProviderImpl value={value}>{children}</TagProviderImpl>
}

export { TagProvider, useTag }
