import { useMemo } from 'react'

import { ListedSnippet } from './listedSnippet.component'
import Styles from './snippetsListing.module.scss'

import type { Snippet } from 'scripts/resources/resources.types'

import { isEmpty, filterObject } from 'src/common/utils/utils'
import {
  useTag,
  fileExtenstionToTag,
} from 'src/modules/snippets/contexts/contexts'

type Props = {
  readonly snippets: readonly Snippet[]
}

export const SnippetsListing = ({ snippets }: Props) => {
  const { tags } = useTag()

  const selectedTags = useMemo(
    () => filterObject(tags, (_, isActive) => isActive),
    [tags]
  )
  const noTagsSelected = useMemo(() => isEmpty(selectedTags), [selectedTags])

  return (
    <ul className={Styles.listing}>
      {snippets
        .filter(({ meta: { fileExtension } }) => {
          const tag = fileExtenstionToTag[fileExtension]
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
