import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Header } from './components/components'
import Styles from './defaultLayout.module.scss'

import type { ReactNode } from 'react'
import type { IntlShape } from 'react-intl'

import { signs, spacer } from 'src/common/constants/constants'
import { compact, pad } from 'src/common/utils/utils'
import { messages } from 'src/locales/translations'

type Props = {
  readonly children: ReactNode
}

const DEFAULT_PAGE_NAME = 'home'
const FALLBACK_PAGE_NAME = 'not-found'
const NOT_FOUND_CODE = 404

const getTitles = (intl: IntlShape, slug: string | undefined = '') => {
  const formatedSlug = slug.replaceAll(signs.minus, spacer)
  const spacedSlug = pad(formatedSlug, formatedSlug.length + 2)

  const prefix = `${spacer}${signs.minus}`
  const subTitle = formatedSlug ? `${prefix}${spacedSlug}` : ''

  const titles = {
    home: intl.formatMessage(messages.homeTitle),
    snippets: intl.formatMessage(messages.snippetsTitle) + subTitle,
    channels: intl.formatMessage(messages.channels) + subTitle,
    [NOT_FOUND_CODE]: FALLBACK_PAGE_NAME,
  }

  return titles as Record<string, string>
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
