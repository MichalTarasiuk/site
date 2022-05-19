import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

import { author } from 'data/author.data'

type Props = {
  readonly children: ReactNode
}
const DefaultLayout = ({ children }: Props) => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>Test</h1>
          {false && <p>{author.description}</p>}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export { DefaultLayout }
