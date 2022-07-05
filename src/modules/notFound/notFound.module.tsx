import { useState } from 'react'

import Styles from './notFound.module.scss'

import { usePaths, usePostponePainting } from 'src/common/hooks/hooks'
import { DefaultLayout } from 'src/layouts/layouts'

const NOT_FOUND_CODE = 404
const FALLBACK_TITLE = '/path/not/found'

export const NotFoundPage = () => {
  const [title, setTitle] = useState(FALLBACK_TITLE)
  const { pathname } = usePaths()

  usePostponePainting(() => {
    setTitle(pathname)
  })

  return (
    <DefaultLayout title={title}>
      <h1 className={Styles.heading}>{NOT_FOUND_CODE}</h1>
    </DefaultLayout>
  )
}
