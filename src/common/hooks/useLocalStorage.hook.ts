import { useState, useCallback } from 'react'

import { useMount } from 'common/hooks/hooks'
import { isFunction } from 'common/utils/utils'

type ResolveableItem<TItem> = TItem | ((item: TItem) => TItem)

const resolveItem = <TItem>(
  resolveableItem: ResolveableItem<TItem>,
  item: TItem
) => (isFunction(resolveableItem) ? resolveableItem(item) : resolveableItem)

export const useLocalStorage = <TItem>(key: string, defaultItem: TItem) => {
  const [item, setItemInner] = useState<TItem>(() => {
    try {
      const item = window.localStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      }

      window.localStorage.setItem(key, JSON.stringify(defaultItem))

      return defaultItem
    } catch (error) {
      console.error(error)
    }
  })

  useMount(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        const item = event.newValue as unknown as TItem

        setItemInner(item)
      }
    }

    return () => {
      window.removeEventListener('storage', listener)
    }
  })

  const setItem = useCallback(
    (resolveableItem: ResolveableItem<TItem>) => {
      try {
        const resolvedItem = resolveItem(resolveableItem, item)
        const stringifyItem = JSON.stringify(resolvedItem)

        window.localStorage.setItem(key, stringifyItem)

        return item
      } catch (error) {
        console.error(error)
      }
    },
    [key, item]
  )

  return [item, setItem] as const
}
