import { useState, useCallback } from 'react'

import { useMount } from 'common/hooks/hooks'

type ResolveableItem<TItem> = TItem | ((value: TItem) => TItem)

const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'

const resolveItem = <TItem>(
  resolveableItem: ResolveableItem<TItem>,
  item: TItem
) => (isFunction(resolveableItem) ? resolveableItem(item) : resolveableItem)

export const useLocalStorage = <TItem>(key: string, defaultValue: TItem) => {
  const [item, setItemInner] = useState<TItem>(() => {
    try {
      const item = window.localStorage.getItem(key)

      if (item) {
        return JSON.parse(item)
      }

      window.localStorage.setItem(key, JSON.stringify(defaultValue))

      return defaultValue
    } catch (error) {
      console.error(error)
    }
  })

  useMount(() => {
    const listener = (event: StorageEvent) => {
      if (event.key === key && event.newValue) {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- safty assertion
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
