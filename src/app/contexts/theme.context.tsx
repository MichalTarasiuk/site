import { createContext, useContext, useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'

import { useLocalStorage, useMount } from 'common/hooks/hooks'

type Props = {
  readonly children: ReactNode
}

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const localStorageName = 'theme'
const defaultTheme = 'light'

const isBrowser = typeof window !== 'undefined'
const query = `(prefers-color-scheme: ${defaultTheme})`
const mediaQueryList = isBrowser ? window.matchMedia(query) : undefined

const inverntion = (theme: Theme) => (theme === 'light' ? 'dark' : 'light')

const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useLocalStorage<Theme>(
    localStorageName,
    defaultTheme
  )

  useMount(() => {
    if (mediaQueryList) {
      const listener = (event: MediaQueryListEvent) => {
        setTheme(event.matches ? defaultTheme : inverntion(defaultTheme))
      }

      mediaQueryList.addEventListener('change', listener)

      return () => {
        mediaQueryList.removeEventListener('change', listener)
      }
    }
  })

  const toggleTheme = useCallback(() => setTheme(inverntion), [setTheme])

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
