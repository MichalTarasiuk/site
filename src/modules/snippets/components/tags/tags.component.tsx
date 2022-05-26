import Cn from 'classnames'

import Styles from './tags.module.scss'

import { entries } from 'src/common/utils/utils'
import { useTag } from 'src/modules/snippets/contexts/contexts'

type Props = {
  readonly name: string
  readonly isActive: boolean
}

const tagPrefix = '#'

const Tag = ({ name, isActive }: Props) => {
  const { toggleTag } = useTag()

  return (
    <button
      onClick={() => toggleTag(name)}
      className={Cn(Styles.tag, {
        [Styles.active]: isActive,
      })}>
      {tagPrefix}
      {name}
    </button>
  )
}

export const Tags = () => {
  const { tags } = useTag()

  return (
    <div className={Styles.tags}>
      {entries(tags).map(([name, isActive]) => (
        <Tag key={name} name={name} isActive={isActive} />
      ))}
    </div>
  )
}
