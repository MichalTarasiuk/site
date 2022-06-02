import Cn from 'classnames'
import Link from 'next/link'

import { Nav } from '../components'

import Styles from './header.module.scss'

import { routes, author } from 'src/common/constants/constants'
import { usePaths } from 'src/common/hooks/hooks'

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
