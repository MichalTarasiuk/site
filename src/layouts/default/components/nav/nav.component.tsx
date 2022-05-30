import Cn from 'classnames'
import Link from 'next/link'
import { useIntl } from 'react-intl'

import Styles from './nav.module.scss'

import { usePaths } from 'src/common/hooks/hooks'
import { author } from 'src/data/author.data'
import { routes } from 'src/data/routes.data'
import { messages } from 'src/locales/translations'

export const Nav = () => {
  const intl = useIntl()
  const { paths, pathname } = usePaths()

  return (
    <nav>
      <ul className={Styles.nav}>
        <li>
          <Link href={paths.channels.url()}>
            <a
              className={Cn(Styles.link, {
                [Styles.bold]: pathname.startsWith(routes.channels),
              })}>
              {intl.formatMessage(messages.channels)}
            </a>
          </Link>
        </li>
        <li>
          <Link href={paths.snippets.url()}>
            <a
              className={Cn(Styles.link, {
                [Styles.bold]: pathname.startsWith(routes.snippets),
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
        {/* <li>
          <a className={Styles.link} href={`mailto:${author.email}`}>
            {intl.formatMessage(messages.contact)}
          </a>
        </li> */}
      </ul>
    </nav>
  )
}
