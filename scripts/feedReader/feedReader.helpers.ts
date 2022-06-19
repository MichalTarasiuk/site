export const getSecondLevelDomain = (hostname: string) => {
  const secondLevelDomain = hostname.replace(/^www\./, '').split('.')[0]

  return secondLevelDomain
}
