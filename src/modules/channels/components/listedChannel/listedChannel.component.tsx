import Link from 'next/link'

import Styles from './listedChannel.module.scss'

import { usePaths } from 'src/common/hooks/hooks'

type Props = {
  readonly title: string
  readonly description: string
  readonly slug: string
}

export const ListedChannel = ({ title, description, slug }: Props) => {
  const { paths } = usePaths()

  return (
    <Link href={paths.channel.slug(slug).url()}>
      <a className={Styles.link}>
        <article className={Styles.listed}>
          <h2 className={Styles.heading}>{title}</h2>
          <p className={Styles.description}>{description}</p>
        </article>
      </a>
    </Link>
  )
}
