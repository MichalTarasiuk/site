import type { Snippet } from 'scripts/resourceReader/resources.types'

export type TagContextValue = {
  readonly tags: Record<string, boolean>
  readonly tagsRepeatability: Record<string, number>
  readonly toggleTag: (name: string, value?: boolean) => void
  readonly setTags: (
    snippets: readonly Pick<Snippet, 'meta'>[],
    fn: Noop
  ) => void
  readonly toggleAllTags: (...activeTags: readonly string[]) => void
}
