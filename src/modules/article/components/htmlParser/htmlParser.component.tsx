import Parse from 'html-react-parser'
import { useState, useRef } from 'react'

import Styles from './htmlParser.module.scss'

import {
  useBeforeFirstPaint,
  useRunningHeader,
  useDOM,
} from 'src/common/hooks/hooks'

type Props = {
  readonly html: string
}

export const HtmlParser = ({ html }: Props) => {
  const [parsedHtml, setParsedHtml] = useState<ReturnType<typeof Parse>>('')
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { setRunningHeader } = useRunningHeader('[id]')

  useBeforeFirstPaint(() => {
    const nextParsedHtml = Parse(html)

    setParsedHtml(nextParsedHtml)
  })

  useDOM(wrapperRef.current, (node) => {
    setRunningHeader(node)
  })

  return (
    <div ref={wrapperRef} className={Styles.wrapper}>
      {parsedHtml}
    </div>
  )
}
