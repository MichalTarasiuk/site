import { useMemo } from 'react'

import { ListedSnippet } from './listedSnippet.component'
import Styles from './snippetsListing.module.scss'

import type { Snippet } from 'scripts/resourceReader/resources.types'

import { isEmpty, filterObject } from 'src/common/utils/utils'
import { useTags } from 'src/modules/snippets/contexts/contexts'
import { getTagByFileExtension } from 'src/modules/snippets/contexts/tags/tags.helpers'

type Props = {
  readonly snippets: readonly Pick<Snippet, 'meta'>[]
}

export const SnippetsListing = ({ snippets }: Props) => {
  const { tags } = useTags()

  const selectedTags = useMemo(
    () => filterObject(tags, (_, isActive) => isActive),
    [tags]
  )
  const noTagsSelected = useMemo(() => isEmpty(selectedTags), [selectedTags])

  return (
    <ul className={Styles.listing}>
      {snippets
        .filter(({ meta: { fileExtension } }) => {
          const tag = getTagByFileExtension(fileExtension)
          const matches = noTagsSelected || selectedTags[tag]

          return matches
        })
        .map(({ meta }) => (
          <li key={meta.title}>
            <ListedSnippet {...meta} />
          </li>
        ))}
    </ul>
  )
}
