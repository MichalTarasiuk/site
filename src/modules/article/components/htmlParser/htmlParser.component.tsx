import Parse from 'html-react-parser'
import { useState } from 'react'

import { useBeforeFirstPaint } from 'src/common/hooks/hooks'

type Props = {
  readonly html: string
}

export const HtmlParser = ({ html }: Props) => {
  const [parsedHtml, setParsedHtml] = useState<ReturnType<typeof Parse>>('')

  useBeforeFirstPaint(() => {
    const nextParsedHtml = Parse(html)

    setParsedHtml(nextParsedHtml)
  })

  return <>{parsedHtml}</>
}
