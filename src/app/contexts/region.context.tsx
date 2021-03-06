import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { IntlProvider } from 'react-intl'

import type { ReactNode } from 'react'

import { createSafeContext } from 'src/common/logic/logic'
import * as EnUSLocale from 'src/locales/en-US.locale.json'
import * as PlLocale from 'src/locales/pl-PL.locale.json'

type Props = {
  readonly children: ReactNode
}

type Locale = typeof EnUSLocale | typeof PlLocale

type RegionContextValue = {
  readonly locale: string
}

const nameToLocale: Record<string, Locale> = {
  'en-US': EnUSLocale,
  'pl-PL': PlLocale,
}

const importMessages = (name: string) =>
  nameToLocale[name] || nameToLocale[DEFAULT_LOCALE]

export const DEFAULT_LOCALE = 'en-US'

const [RegionProviderImpl, useRegion] =
  createSafeContext<RegionContextValue>('region')

const RegionProvider = ({ children }: Props) => {
  const { query } = useRouter()

  const locale = useMemo(
    () => query.locale?.toString() || DEFAULT_LOCALE,
    [query.locale]
  )
  const messages = useMemo(() => importMessages(locale), [locale])

  const value = useMemo(() => ({ locale }), [locale])

  return (
    <RegionProviderImpl value={value}>
      <IntlProvider
        locale={locale}
        messages={messages}
        defaultLocale={DEFAULT_LOCALE}>
        {children}
      </IntlProvider>
    </RegionProviderImpl>
  )
}

export { useRegion, RegionProvider }
