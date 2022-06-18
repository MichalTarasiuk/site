import type { IntlShape } from 'react-intl'

import { signs, spacer } from 'src/common/constants/constants'
import { pad } from 'src/common/utils/utils'
import { messages } from 'src/locales/translations'

export const DEFAULT_PAGE_NAME = 'home'
export const FALLBACK_PAGE_NAME = 'not-found'
export const NOT_FOUND_CODE = 404

export const getTitles = (intl: IntlShape, slug: string | undefined = '') => {
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
