import { format } from 'light-date'

export const formatDateFull = (value: string) => {
  const date = new Date(value)

  const day = format(date, '{dd}')
  const month = format(date, '{MM}')
  const year = format(date, '{yyyy}')

  return `${day}-${month}-${year}`
}
