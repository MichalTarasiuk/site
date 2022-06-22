import Cn from 'classnames'

import Styles from './tableOfContents.module.scss'

type Props = {
  readonly activeContent: string | null
  readonly contents: readonly string[]
}

export const TableOfContents = ({ activeContent, contents }: Props) => {
  return (
    <div className={Styles.wrapper}>
      <h2>Table of contents</h2>
      <ul>
        {contents.map((content) => (
          <li
            key={content}
            className={Cn({
              [Styles.activeContent]: activeContent === content,
            })}>
            {content}
          </li>
        ))}
      </ul>
    </div>
  )
}
