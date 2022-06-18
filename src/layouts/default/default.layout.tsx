import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Header } from './components/components'
import {
  DEFAULT_PAGE_NAME,
  NOT_FOUND_CODE,
  getTitles,
} from './defaultLayout.helpers'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'

import { compact } from 'src/common/utils/utils'
import { messages } from 'src/locales/translations'

type Props = {
  readonly children: ReactNode
}

const DefaultLayout = ({ children }: Props) => {
  const intl = useIntl()
  const { asPath } = useRouter()

  const [pageName = DEFAULT_PAGE_NAME, slug] = useMemo(
    () => compact(asPath.split('/')).slice(1),
    [asPath]
  )
  const titles = useMemo(() => getTitles(intl, slug), [intl, slug])

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.banner}>
        <Header />
        <div className={Styles.content}>
          <h1>{titles[pageName] || titles[NOT_FOUND_CODE]}</h1>
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
