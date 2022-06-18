import { useIntl } from 'react-intl'

import Styles from './home.module.scss'

import { DefaultLayout } from 'src/layouts/layouts'
import { messages } from 'src/locales/translations'

export const HomePage = () => {
  const intl = useIntl()

  return (
    <DefaultLayout
      title={intl.formatMessage(messages.homeTitle)}
      subtitle={intl.formatMessage(messages.homeSubtitle)}>
      <div className={Styles.content}>
        <p>{intl.formatMessage(messages.homeDescriptionWelcome)}</p>
        <br />
        <p>{intl.formatMessage(messages.homeDescriptionPlans)}</p>
        <br />
        <p>{intl.formatMessage(messages.homeDescriptionIdea)}</p>
        <br />
        <p>{intl.formatMessage(messages.homeDescriptionContact)}</p>
        <br />
        <p>{intl.formatMessage(messages.homeDescriptionEnd)}</p>
      </div>
    </DefaultLayout>
  )
}
