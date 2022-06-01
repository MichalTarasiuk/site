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

  console.log(slug)

  return (
    <Link href={paths.channel.slug(slug).url()}>
      <article className={Styles.listed}>
        <h2 className={Styles.heading}>{title}</h2>
        <p className={Styles.description}>{description}</p>
      </article>
    </Link>
  )
}
