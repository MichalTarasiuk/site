import type { EffectCallback } from 'react'

import { useMount } from 'src/common/hooks/hooks'

export const useUnMount = (cleanUpEffect: ReturnType<EffectCallback>) => {
  useMount(() => cleanUpEffect)
}
