import { useRef } from 'react'

import Styles from './notFound.module.scss'

import { usePaths, usePostponePainting } from 'src/common/hooks/hooks'
import { DefaultLayout } from 'src/layouts/layouts'

const NOT_FOUND_CODE = 404
const FALLBACK_TITLE = '/path/not/found'

export const NotFoundPage = () => {
  const title = useRef(FALLBACK_TITLE)
  const { pathname } = usePaths()

  usePostponePainting((postponse) => {
    title.current = pathname

    postponse()
  })

  return (
    <DefaultLayout title={title.current}>
      <h1 className={Styles.heading}>{NOT_FOUND_CODE}</h1>
    </DefaultLayout>
  )
}
