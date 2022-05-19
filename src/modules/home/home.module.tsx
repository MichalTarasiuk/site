import { useIntl } from 'react-intl'

import Styles from './homeModule.module.scss'

import { messages } from 'locales/translations'

export const HomePage = () => {
  const intl = useIntl()

  return (
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
  )
}
