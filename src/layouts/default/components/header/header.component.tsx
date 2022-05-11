import Cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Nav } from '../components'

import Styles from './header.module.scss'

import { author } from 'data/author.data'
import { routes } from 'data/routes.data'

export const Header = () => {
  const { pathname } = useRouter()

  return (
    <header className={Styles.header}>
      <div className={Styles.content}>
        <Link href={routes.home}>
          <a
            className={Cn(Styles.link, {
              [Styles.bold]: pathname.startsWith(routes.home),
            })}>
            {author.fullname.toLowerCase()}
          </a>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
