import { useMemo, useCallback } from 'react'

import type { Snippet } from 'modules/snippets/snippets.types'
import type { ReactNode } from 'react'

import { useForce } from 'common/hooks/hooks'
import { createSafeContext } from 'common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type TagContextValue = {
  readonly toggleTag: (name: string) => void
  readonly setInitialTags: (snippets: readonly Snippet[]) => void
}

const [TagProviderImpl, useTag] = createSafeContext<TagContextValue>('tag')

const TagProvider = ({ children }: Props) => {
  const tags = useMemo(() => new Map<string, boolean>(), [])

  const force = useForce()

  const setInitialTags: TagContextValue['setInitialTags'] = useCallback(
    (snippets) => {
      snippets.forEach((snippet) => {
        const has = tags.has(snippet.tag)

        if (!has) {
          tags.set(snippet.tag, false)
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
      setInitialTags,
      toggleTag,
    }),
    [setInitialTags, toggleTag]
  )

  return <TagProviderImpl value={value}>{children}</TagProviderImpl>
}

export { TagProvider, useTag }
