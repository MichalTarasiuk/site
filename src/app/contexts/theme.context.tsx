import { useMemo, useCallback } from 'react'

import type { ReactNode } from 'react'

import { isClientEnvironment } from 'src/common/constants/constants'
import { useLocalStorage, useMount, useUpdate } from 'src/common/hooks/hooks'
import { createSafeContext } from 'src/common/logic/logic'

type Props = {
  readonly children: ReactNode
}

type Theme = 'light' | 'dark'
type ThemeContextValue = {
  readonly theme: Theme
  readonly toggleTheme: () => void
}

const LOCAL_STORAGE_NAME = 'theme'
const DEFAULT_THEME = 'light'

const query = `(prefers-color-scheme: ${DEFAULT_THEME})`
const mediaQueryList = isClientEnvironment
  ? window.matchMedia(query)
  : undefined

const inverntion = (theme: Theme) => (theme === 'light' ? 'dark' : 'light')

const [ThemeProviderImpl, useTheme] =
  createSafeContext<ThemeContextValue>('theme')

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

  return <ThemeProviderImpl value={value}>{children}</ThemeProviderImpl>
}

export { ThemeProvider, useTheme }
