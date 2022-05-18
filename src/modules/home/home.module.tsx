import Styles from './homeModule.module.scss'

export const HomePage = () => {
  return (
    <div className={Styles.content}>
      <p>Welcome to my digital garden!</p>
      <br />
      <p>
        I am a frontend from Lublin. In the future I plan to develop towards
        backend, mainly working with React, Next.js and TypeScript.
      </p>
      <br />
      <p>
        This space is my personal corner of the Internet. I consider it more of
        a digital garden than a blog. This means that sometimes I write things
        that are underdeveloped as I learn and develop. I think doing it
        publicly is more important than collecting drafts of your posts.
      </p>
      <br />
      <p>If you want to contact me please contact me on Discord.</p>
      <br />
      <p>Thanks for stopping by!</p>
    </div>
  )
}
