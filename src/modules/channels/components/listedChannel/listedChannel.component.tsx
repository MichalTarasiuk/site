import Styles from './listedChannel.module.scss'

type Props = {
  readonly title: string
  readonly description: string
}

export const ListedChannel = ({ title, description }: Props) => {
  return (
    <article className={Styles.listed}>
      <h2 className={Styles.heading}>{title}</h2>
      <p className={Styles.description}>{description}</p>
    </article>
  )
}
