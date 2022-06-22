import Parse from 'html-react-parser'
import { useState, useRef, useMemo } from 'react'

import Styles from './htmlParser.module.scss'

import { useBeforeFirstPaint, useRunningHeader } from 'src/common/hooks/hooks'
import { TableOfContents } from 'src/modules/article/components/components'
import { useEnsuredChildNodes } from 'src/modules/article/hooks/hooks'

type Props = {
  readonly html: string
}

export const HtmlParser = ({ html }: Props) => {
  const [parsedHtml, setParsedHtml] = useState<ReturnType<typeof Parse>>('')
  const parsedHtmlRef = useRef<HTMLDivElement>(null)

  const { highestHeader, subscribers, setRunningHeader } =
    useRunningHeader('[id]')

  useBeforeFirstPaint(() => {
    const nextParsedHtml = Parse(html)

    setParsedHtml(nextParsedHtml)
  })

  useEnsuredChildNodes(parsedHtmlRef.current, (node) => {
    setRunningHeader(node)
  })

  const contents = useMemo(
    () =>
      subscribers.current.map(({ innerText, id }) => ({
        text: innerText.trim(),
        id,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- compare by primitive value is safty
    [subscribers.current.length]
  )

  return (
    <div className={Styles.wrapper}>
      <div ref={parsedHtmlRef} className={Styles.parsedHtml}>
        {parsedHtml}
      </div>
      <div className={Styles.side}>
        <TableOfContents
          highestContentText={highestHeader?.innerText.trim() ?? null}
          contents={contents}
        />
      </div>
    </div>
  )
}
