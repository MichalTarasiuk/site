import { useIntl } from 'react-intl'

import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

import { messages } from 'locales/translations'

type Props = {
  readonly children: ReactNode
}
const DefaultLayout = ({ children }: Props) => {
  const intl = useIntl()

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>{intl.formatMessage(messages.homeTitle)}</h1>
          {true && <p>{intl.formatMessage(messages.homeSubTitle)}</p>}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export { DefaultLayout }
