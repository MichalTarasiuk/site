import Link from 'next/link'
import { useMemo, useCallback } from 'react'

import Styles from './listedSnippet.module.scss'

import type { MouseEvent } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { signs } from 'src/common/constants/constants'
import { usePaths } from 'src/common/hooks/hooks'
import {
  reverseString,
  blockBatching,
  uppercaseFirst,
  filterObject,
} from 'src/common/utils/utils'
import {
  useTags,
  fileExtenstionToTag,
} from 'src/modules/snippets/contexts/contexts'

type Props = Snippet['meta']

export const ListedSnippet = ({ title, publishedAt, fileExtension }: Props) => {
  const { paths } = usePaths()
  const { toggleTag, resetTags, tags } = useTags()

  const tag = fileExtenstionToTag[fileExtension]

  const formatedDate = useMemo(
    () => reverseString(publishedAt, signs.minus),
    [publishedAt]
  )
  const formatedTitle = useMemo(() => uppercaseFirst(title), [title])
  const slugName = useMemo(() => title.replace(/\s/g, signs.minus), [title])

  const handleTagButton = useCallback(
    (event: MouseEvent, tag: string) => {
      event.stopPropagation()

      const activeTags = filterObject(tags, (_, value) => value)
      const namesOfActiveTags = Object.keys(activeTags)
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
    },
    [resetTags, toggleTag, tags]
  )

  return (
    <Link href={paths.snippet.slug(slugName).url()} passHref>
      {/* <a className={Styles.link}> */}
      <article className={Styles.listed}>
        <div>
          <time className={Styles.time}>{formatedDate}</time>
        </div>
        <section>
          <h2>{formatedTitle}</h2>
          <button
            onClick={(event) => handleTagButton(event, tag)}
            className={Styles.tag}>
            <span>#{tag}</span>
          </button>
        </section>
      </article>
      {/* </a> */}
    </Link>
  )
}
