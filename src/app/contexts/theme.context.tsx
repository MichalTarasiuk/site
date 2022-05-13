import { useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'

import { useLocalStorage, useMount, useUpdate } from 'common/hooks/hooks'
import { createSafeContext } from 'common/utils/utils'

type Props = {
  readonly children: ReactNode
}

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: () => void
}

const [ThemeInnerProvider, useTheme] =
  createSafeContext<ThemeContextValue>('theme')

const LOCAL_STORAGE_NAME = 'theme'
const DEFAULT_THEME = 'light'

const isBrowser = typeof window !== 'undefined'
const query = `(prefers-color-scheme: ${DEFAULT_THEME})`
const mediaQueryList = isBrowser ? window.matchMedia(query) : undefined

const inverntion = (theme: Theme) => (theme === 'light' ? 'dark' : 'light')

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    LOCAL_STORAGE_NAME,
    DEFAULT_THEME,
    { sync: true }
  )

  const toggleTheme: ThemeContextValue['toggleTheme'] = useCallback(
    () => setTheme(inverntion),
    [setTheme]
  )

  useMount(() => {
    if (mediaQueryList) {
      const listener = (event: MediaQueryListEvent) => {
        setTheme(event.matches ? DEFAULT_THEME : inverntion(DEFAULT_THEME))
      }

      mediaQueryList.addEventListener('change', listener)

      return () => {
        mediaQueryList.removeEventListener('change', listener)
      }
    }
  })

  useUpdate(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeInnerProvider value={value}>{children}</ThemeInnerProvider>
}

export { ThemeProvider, useTheme }
