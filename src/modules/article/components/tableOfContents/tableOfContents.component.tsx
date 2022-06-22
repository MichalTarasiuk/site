import Cn from 'classnames'
import Link from 'next/link'

import Styles from './tableOfContents.module.scss'

type Content = {
  readonly text: string
  readonly id: string
}

type Props = {
  readonly highestContentText: string | null
  readonly contents: readonly Content[]
}

export const TableOfContents = ({ highestContentText, contents }: Props) => {
  const shouldDisplay = contents.length !== 0

  if (shouldDisplay) {
    return (
      <aside className={Styles.wrapper}>
        <h2 className={Styles.heading}>Table of contents</h2>
        <nav>
          <ul>
            {contents.map(({ text, id }) => (
              <li key={id}>
                <Link href={`#${id}`}>
                  <a
                    className={Cn(Styles.link, {
                      [Styles.activeLink]: highestContentText === text,
                    })}>
                    {text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    )
  }

  return null
}
