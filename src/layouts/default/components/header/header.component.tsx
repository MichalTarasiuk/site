import Cn from 'classnames'
import Link from 'next/link'

import { Nav } from '../components'

import Styles from './header.module.scss'

import { usePaths } from 'common/hooks/hooks'
import { author } from 'data/author.data'
import { routes } from 'data/routes.data'

export const Header = () => {
  const { paths, pathname } = usePaths()

  return (
    <header className={Styles.header}>
      <div className={Styles.content}>
        <Link href={paths.url()}>
          <a
            className={Cn(Styles.link, {
              [Styles.bold]: pathname === routes.home,
            })}>
            {author.fullname.toLowerCase()}
          </a>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
