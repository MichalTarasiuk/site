import Parse from 'html-react-parser'
import { useMemo, useRef } from 'react'

import { getSections } from './articleImpl.helpers'
import Styles from './articleImpl.module.scss'

import {
  useMount,
  usePreviousPersistent,
  useRunningHeader,
} from 'src/common/hooks/hooks'
import { TableOfContents } from 'src/modules/article/components/components'
import { useAutoPercentage } from 'src/modules/article/hooks/hooks'

type Props = {
  readonly content: string
}

export const ArticleImpl = ({ content }: Props) => {
  const contentRef = useRef<HTMLDivElement>(null)

  const jsx = useMemo(() => Parse(content), [content])
  const sections = useMemo(() => getSections(jsx), [jsx])
  const steps = useMemo(
    () => sections.map((section) => section.text),
    [sections]
  )

  const autoPercentage = useAutoPercentage(steps)
  const { id, setRunningHeader } = useRunningHeader('[id]')

  usePreviousPersistent(id, (nextId) => {
    if (nextId) {
      autoPercentage.updateProgress(nextId)
    }
  })

  useMount(() => {
    setRunningHeader(contentRef.current)
  })

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.jsx} ref={contentRef}>
        {jsx}
      </div>
      <div className={Styles.side}>
        <TableOfContents id={id} contents={sections} />
      </div>
    </div>
  )
}
