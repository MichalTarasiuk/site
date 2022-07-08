import { createContext, useContext } from 'react'

import { upperCaseFirstLetter } from 'src/common/utils/utils'

export const createSafeContext = <
  TValue extends PlainObject | undefined = undefined
>(
  name: string
) => {
  const formatedName = upperCaseFirstLetter(name)
  const safeContext = createContext<TValue | undefined>(undefined)

  const useSafeContext = () => {
    const context = useContext(safeContext)

    if (context === undefined) {
      throw new Error(
        `use${formatedName} must be used within a ${formatedName}Provider`
      )
    }

    return context
  }

  return [safeContext.Provider, useSafeContext] as const
}
