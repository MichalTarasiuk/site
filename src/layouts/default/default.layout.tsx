import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

import { compact } from 'common/utils/utils'
import { messages } from 'locales/translations'

type Props = {
  readonly children: ReactNode
}

const DEFAULT_PAGE_NAME = 'home'
const FALLBACK_PAGE_NAME = 'not-found'

const DefaultLayout = ({ children }: Props) => {
  const intl = useIntl()
  const { asPath } = useRouter()

  const [_, pageName = DEFAULT_PAGE_NAME] = useMemo(
    () => compact(asPath.split('/')),
    [asPath]
  )

  const pageNameToTitle: Record<string, string> = useMemo(
    () => ({
      home: intl.formatMessage(messages.homeTitle),
      fallback: FALLBACK_PAGE_NAME,
    }),
    [intl]
  )

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>{pageNameToTitle[pageName] || pageNameToTitle['404']}</h1>
          {pageName === 'home' && (
            <p>{intl.formatMessage(messages.homeSubTitle)}</p>
          )}
        </div>
      </div>
      <main>{children}</main>
    </div>
  )
}

export { DefaultLayout }
