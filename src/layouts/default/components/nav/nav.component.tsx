import Cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Styles from './nav.module.scss'

import { author } from 'data/author.data'
import { routes } from 'data/routes.data'

export const Nav = () => {
  const { pathname } = useRouter()

  return (
    <nav>
      <ul className={Styles.nav}>
        <li>
          <Link href={routes.snippets.index}>
            <a
              className={Cn(Styles.link, {
                [Styles.bold]: pathname.startsWith(routes.snippets.index),
              })}>
              snippets
            </a>
          </Link>
        </li>
        <li>
          <a
            className={Styles.link}
            href={author.githubLink}
            target="_blank"
            rel="noopener noreferrer">
            github
          </a>
        </li>
        <li>
          <a className={Styles.link} href={`mailto:${author.email}`}>
            contact
          </a>
        </li>
      </ul>
    </nav>
  )
}
