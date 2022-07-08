import Styles from './notFound.module.scss'

import { DefaultLayout } from 'src/layouts/layouts'

const NOT_FOUND_CODE = 404
const FALLBACK_TITLE = '/path/not/found'

export const NotFoundPage = () => {
  return (
    <DefaultLayout title={FALLBACK_TITLE}>
      <h1 className={Styles.heading}>{NOT_FOUND_CODE}</h1>
    </DefaultLayout>
  )
}
