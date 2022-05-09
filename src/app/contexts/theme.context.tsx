import { createContext, useContext, useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'

import { useLocalStorage, useMount, useUpdate } from 'common/hooks/hooks'

type Props = {
  readonly children: ReactNode
}

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const LOCAL_STORAGE_NAME = 'theme'
const DEFAULT_THEME = 'light'

const isBrowser = typeof window !== 'undefined'
const query = `(prefers-color-scheme: ${DEFAULT_THEME})`
const mediaQueryList = isBrowser ? window.matchMedia(query) : undefined

const inverntion = (theme: Theme) => (theme === 'light' ? 'dark' : 'light')

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    LOCAL_STORAGE_NAME,
    DEFAULT_THEME
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
    // logic of toggling theme
  }, [theme])

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export { ThemeProvider, useTheme }
