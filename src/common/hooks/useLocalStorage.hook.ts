import { useState, useCallback } from 'react'

import { useEvent, useMount } from 'src/common/hooks/hooks'
import { isFunction } from 'src/common/utils/utils'

type ResolveableItem<TItem> = TItem | ((item: TItem) => TItem)

type LocalStorageInit = {
  readonly sync?: boolean
}

const resolveItem = <TItem>(
  resolveableItem: ResolveableItem<TItem>,
  item: TItem
) => (isFunction(resolveableItem) ? resolveableItem(item) : resolveableItem)

export const useLocalStorage = <TItem>(
  key: string,
  defaultItem: TItem,
  localStorageInit?: LocalStorageInit
) => {
  const { sync } = localStorageInit || {}

  const [item, setItem] = useState<TItem>(() => {
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

  const setStoredItem = useCallback(
    (resolveableItem: ResolveableItem<TItem>) => {
      try {
        const resolvedItem = resolveItem(resolveableItem, item)
        const stringifyItem = JSON.stringify(resolvedItem)

        setItem(resolvedItem)

        window.localStorage.setItem(key, stringifyItem)

        return item
      } catch (error) {
        console.error(error)
      }
    },
    [key, item]
  )

  const storageListener = useEvent(
    (event: StorageEvent) => {
      if (sync && event.key !== key) {
        return
      }

      try {
        const newItem = event.newValue

        if (newItem) {
          setItem(JSON.parse(newItem) as TItem)
        }
      } catch (error) {
        console.error(error)
      }
    },
    [key, sync]
  )

  useMount(() => {
    window.addEventListener('storage', storageListener)

    return () => {
      window.removeEventListener('storage', storageListener)
    }
  })

  return [item, setStoredItem] as const
}
