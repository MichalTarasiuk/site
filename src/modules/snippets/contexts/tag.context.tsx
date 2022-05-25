import { useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { useForce } from 'src/common/hooks/hooks'
import { createSafeContext, fromEntries } from 'src/common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type TagContextValue = {
  readonly tags: Record<string, boolean>
  readonly toggleTag: (name: string) => void
  readonly setTags: (snippets: readonly Snippet[]) => void
}

const fileExtenstionToTag = {
  js: 'javascript',
  ts: 'typescript',
  css: 'css',
}

const [TagProviderImpl, useTag] = createSafeContext<TagContextValue>('tag')

const TagProvider = ({ children }: Props) => {
  const tagsMap = useMemo(() => new Map<string, boolean>(), [])
  const tags = useMemo(() => fromEntries([...tagsMap.entries()]), [tagsMap])

  const force = useForce()

  const setTags: TagContextValue['setTags'] = useCallback(
    (snippets) => {
      snippets.forEach(({ fileEextension }) => {
        const tag = fileExtenstionToTag[fileEextension]
        const has = tagsMap.has(tag)

        if (!has) {
          tagsMap.set(tag, false)
        }
      })
    },
    [tagsMap]
  )

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
      toggleTag,
    }),
    [tags, setTags, toggleTag]
  )

  return <TagProviderImpl value={value}>{children}</TagProviderImpl>
}

export { TagProvider, useTag }
