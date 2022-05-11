import { useRouter } from 'next/router'

import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

import { author } from 'data/author.data'
import { routes } from 'data/routes.data'

type Props = {
  readonly children: ReactNode
}

const fistname = author.fullname.split(' ')[0]

const pathToTile: Record<string, string> = {
  '/': `hey, i'm ${fistname}! 🔥`,
  '/snippets': 'snippets',
  '404': '404',
}

const DefaultLayout = ({ children }: Props) => {
  const { pathname } = useRouter()

  const title = pathToTile[pathname] || pathToTile['404']
  const isHomePage = pathname === routes.home

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>{title}</h1>
          {isHomePage && <p>{author.description}</p>}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export { DefaultLayout }
