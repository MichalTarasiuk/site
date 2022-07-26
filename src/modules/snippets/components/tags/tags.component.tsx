import Cn from 'classnames'

import Styles from './tags.module.scss'

import { signs } from 'src/common/constants/constants'
import { useTab } from 'src/common/hooks/hooks'
import { entries, objectKeys } from 'src/common/utils/utils'
import {
  useTags,
  useTagsSelected,
} from 'src/modules/snippets/contexts/contexts'

const TAB_NAME = 'snippets_tags'

export const Tags = () => {
  const { tags, tagsRepeatability, toggleAllTags } = useTags()
  const tab = useTab(TAB_NAME, (message) => {
    const splitedTags = message.split(signs.comma)

    toggleAllTags(...splitedTags)
  })

  useTagsSelected((activeTags) => {
    const formatedTags = objectKeys(activeTags).join(signs.comma)

    tab.postMessage(formatedTags)
  })

  return (
    <div className={Styles.tags}>
      {entries(tags).map(([name, isActive]) => (
        <Tag
          key={name}
          name={name}
          isActive={isActive}
          repeatability={tagsRepeatability[name]}
        />
      ))}
    </div>
  )
}

type TagProps = {
  readonly name: string
  readonly isActive: boolean
  readonly repeatability: number
}

const Tag = ({ name, isActive, repeatability }: TagProps) => {
  const { toggleTag } = useTags()

  return (
    <button
      onClick={() => toggleTag(name)}
      className={Cn(Styles.tag, {
        [Styles.active]: isActive,
      })}>
      {`#${name} (${repeatability})`}
    </button>
  )
}
