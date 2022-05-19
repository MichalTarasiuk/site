import Cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Nav } from '../components'

import Styles from './header.module.scss'

import { usePaths } from 'common/hooks/hooks'
import { author } from 'data/author.data'
import { routes } from 'data/routes.data'

export const Header = () => {
  const paths = usePaths()
  const { pathname } = useRouter()

  return (
    <header className={Styles.header}>
      <div className={Styles.content}>
        <Link href={paths.url()}>
          <a
            className={Cn(Styles.link, {
              [Styles.bold]: false,
            })}>
            {author.fullname.toLowerCase()}
          </a>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
