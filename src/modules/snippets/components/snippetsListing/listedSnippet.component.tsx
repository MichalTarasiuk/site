import Link from 'next/link'
import { useMemo, useCallback } from 'react'

import Styles from './listedSnippet.module.scss'

import type { MouseEvent } from 'react'
import type { Snippet } from 'scripts/resources/resources.types'

import { usePaths } from 'src/common/hooks/hooks'
import { reverseString, stopBatching } from 'src/common/utils/utils'
import {
  useTag,
  fileExtenstionToTag,
} from 'src/modules/snippets/contexts/contexts'

type Props = Snippet['meta']

export const ListedSnippet = ({ title, publishedAt, fileExtension }: Props) => {
  const { paths } = usePaths()
  const { toggleTag, resetTags, tags } = useTag()

  const formatedDate = useMemo(
    () => reverseString(publishedAt, '-'),
    [publishedAt]
  )
  const tag = useMemo(() => fileExtenstionToTag[fileExtension], [fileExtension])

  const handleTagButton = useCallback(
    (event: MouseEvent, tag: string) => {
      event.stopPropagation()

      const isActive = tags[tag]

      if (!isActive) {
        resetTags()
      }

      stopBatching(() => {
        toggleTag(tag)
      })
    },
    [resetTags, toggleTag, tags]
  )

  return (
    <Link href={paths.snippets.url()} passHref>
      <article className={Styles.listed}>
        <div>
          <p>{formatedDate}</p>
        </div>
        <section>
          <h2>{title}</h2>
          <button
            onClick={(event) => handleTagButton(event, tag)}
            className={Styles.tag}>
            #{tag}
          </button>
        </section>
      </article>
    </Link>
  )
}
