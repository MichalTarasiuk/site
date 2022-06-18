import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

type Props = {
  readonly title: string
  readonly subtitle?: string
  readonly children: ReactNode
}

const DefaultLayout = ({ title, subtitle, children }: Props) => {
  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export { DefaultLayout }
