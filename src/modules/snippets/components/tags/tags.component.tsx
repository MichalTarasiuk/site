import Cn from 'classnames'

import Styles from './tags.module.scss'

import { entries } from 'src/common/utils/utils'
import { useTags } from 'src/modules/snippets/contexts/contexts'

type Props = {
  readonly name: string
  readonly isActive: boolean
}

const Tag = ({ name, isActive }: Props) => {
  const { toggleTag } = useTags()

  return (
    <button
      onClick={() => toggleTag(name)}
      className={Cn(Styles.tag, {
        [Styles.active]: isActive,
      })}>
      #{name}
    </button>
  )
}

export const Tags = () => {
  const { tags } = useTags()

  return (
    <div className={Styles.tags}>
      {entries(tags).map(([name, isActive]) => (
        <Tag key={name} name={name} isActive={isActive} />
      ))}
    </div>
  )
}
