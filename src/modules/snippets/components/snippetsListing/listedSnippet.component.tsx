import Link from 'next/link'

import Styles from './listedSnippet.module.scss'

import type { MouseEvent } from 'react'
import type { Snippet } from 'scripts/resourceReader/resources.types'

import { signs } from 'src/common/constants/constants'
import { usePaths } from 'src/common/hooks/hooks'
import {
  reverseString,
  blockBatching,
  upperCaseFirstLetter,
  filterObject,
  objectKeys,
} from 'src/common/utils/utils'
import { useTags } from 'src/modules/snippets/contexts/contexts'
import { getTagByFileExtension } from 'src/modules/snippets/contexts/tags/tags.helpers'

type Props = Snippet['meta']

export const ListedSnippet = ({ title, publishedAt, fileExtension }: Props) => {
  const { paths } = usePaths()
  const { toggleTag, toggleAllTags: resetTags, tags } = useTags()

  const tag = getTagByFileExtension(fileExtension)

  const handleTagButton = (event: MouseEvent, tag: string) => {
    event.preventDefault()

    const activeTags = filterObject(tags, (_, value) => value)
    const namesOfActiveTags = objectKeys(activeTags)
    const lengthOfActiveTags = namesOfActiveTags.length

    const canToggleTag = !(
      lengthOfActiveTags === 1 && namesOfActiveTags[0] === tag
    )

    if (canToggleTag) {
      resetTags(tag)

      blockBatching(() => {
        toggleTag(tag, true)
      })
    }
  }

  return (
    <Link href={paths.snippet.slug(title.replace(/\s/g, signs.minus)).url()}>
      <a className={Styles.link}>
        <article className={Styles.listed}>
          <div>
            <time className={Styles.time}>
              {reverseString(publishedAt, signs.minus)}
            </time>
          </div>
          <section>
            <h2>{upperCaseFirstLetter(title)}</h2>
            <button
              onClick={(event) => handleTagButton(event, tag)}
              className={Styles.tag}>
              <span>#{tag}</span>
            </button>
          </section>
        </article>
      </a>
    </Link>
  )
}
