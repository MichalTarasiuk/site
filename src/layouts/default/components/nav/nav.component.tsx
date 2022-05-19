import Cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

import Styles from './nav.module.scss'

import { usePaths } from 'common/hooks/hooks'
import { author } from 'data/author.data'
import { routes } from 'data/routes.data'
import { messages } from 'locales/translations'

export const Nav = () => {
  const intl = useIntl()
  const { paths } = usePaths()
  const { pathname } = useRouter()

  return (
    <nav>
      <ul className={Styles.nav}>
        <li>
          <Link href={paths.snippets.url()}>
            <a
              className={Cn(Styles.link, {
                [Styles.bold]: pathname.startsWith(routes.snippets.index),
              })}>
              {intl.formatMessage(messages.snippets)}
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
            {intl.formatMessage(messages.contact)}
          </a>
        </li>
      </ul>
    </nav>
  )
}
