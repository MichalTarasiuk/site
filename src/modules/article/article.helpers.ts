import { signs, spacer } from 'src/common/constants/constants'

export const getArticleSlug = (title: string) =>
  title.toLowerCase().replaceAll(spacer, signs.minus)
