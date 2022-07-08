import Parse from 'html-react-parser'
import { useMemo } from 'react'

import { getSections } from './articleImpl.helpers'
import Styles from './articleImpl.module.scss'

import { useRunningHeader } from 'src/common/hooks/hooks'
import { TableOfContents } from 'src/modules/article/components/components'
import { useAutoPercentage } from 'src/modules/article/hooks/hooks'

type Props = {
  readonly content: string
}

export const ArticleImpl = ({ content }: Props) => {
  const jsx = useMemo(() => Parse(content), [content])
  const sections = useMemo(() => getSections(jsx), [jsx])

  const autoPercentage = useAutoPercentage(['a', 'b', 'c'])
  const { highestHeader, subscribers, setRunningHeader } =
    useRunningHeader('[id]')

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.jsx}>{jsx}</div>
      <div className={Styles.side}>
        <TableOfContents
          highestContentText={highestHeader?.innerText.trim() ?? null}
          contents={[]}
        />
      </div>
    </div>
  )
}
