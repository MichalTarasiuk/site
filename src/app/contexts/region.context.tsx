import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'

import type { ReactNode } from 'react'

import * as EnUSLocale from 'locales/en-US.locale.json'
import * as PlLocale from 'locales/pl-PL.locale.json'

type Props = {
  readonly children: ReactNode
}

type Locale = typeof EnUSLocale | typeof PlLocale

const nameToLocale: Record<string, Locale> = {
  'en-US': EnUSLocale,
  'pl-PL': PlLocale,
}

const importMessages = (name: string) =>
  nameToLocale[name] || nameToLocale[DEFAULT_LOCALE]

const DEFAULT_LOCALE = 'en-US'

export const RegionProvider = ({ children }: Props) => {
  const router = useRouter()

  const locale = router.query.locale?.toString() || DEFAULT_LOCALE

  const messages = useMemo(() => importMessages(locale), [locale])

  return (
    <IntlProvider
      locale={locale}
      messages={messages}
      defaultLocale={DEFAULT_LOCALE}>
      {children}
    </IntlProvider>
  )
}
