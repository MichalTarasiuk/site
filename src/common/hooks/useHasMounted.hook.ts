import { useRef } from 'react'

import { useMount } from 'src/common/hooks/hooks'

export const useHasMounted = () => {
  const hasMounted = useRef(false)

  useMount(() => {
    hasMounted.current = true
  })

  return hasMounted.current
}
