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
  const tags = useMemo(() => new Map<string, boolean>(), [])

  const force = useForce()

  const setTags: TagContextValue['setTags'] = useCallback(
    (snippets) => {
      snippets.forEach(({ fileEextension }) => {
        const tag = fileExtenstionToTag[fileEextension]
        const has = tags.has(tag)

        if (!has) {
          tags.set(tag, false)
        }
      })
    },
    [tags]
  )

  const toggleTag: TagContextValue['toggleTag'] = useCallback(
    (name) => {
      const isActive = tags.get(name)

      if (isActive) {
        tags.set(name, false)
      } else {
        tags.set(name, true)
      }

      force()
    },
    [tags, force]
  )

  const value = useMemo(
    () => ({
      tags: fromEntries([...tags.entries()]),
      setTags,
      toggleTag,
    }),
    [tags, setTags, toggleTag]
  )

  return <TagProviderImpl value={value}>{children}</TagProviderImpl>
}

export { TagProvider, useTag }
