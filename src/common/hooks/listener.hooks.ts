import { useMount, useEvent } from 'src/common/hooks/hooks'

export const useIsScrolled = (fn: (isScrolled: boolean) => void) => {
  const stableFn = useEvent(fn, [fn])

  useMount(() => {
    const listener = () => {
      const isScrolled = window.scrollY !== 0

      stableFn(isScrolled)
    }

    window.addEventListener('scroll', listener)

    return () => {
      window.removeEventListener('scroll', listener)
    }
  })
}
