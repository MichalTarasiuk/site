import { createContext, useContext } from 'react'

import { uppercaseFirst } from 'common/utils/utils'

export const createSafeContext = <TValue extends PlainObject>(name: string) => {
  const formatedName = uppercaseFirst(name)
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
