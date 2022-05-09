import type { EffectCallback } from 'react'

import { useMount } from 'common/hooks/hooks'

export const useUnMount = (cleanUpEffect: ReturnType<EffectCallback>) => {
  useMount(() => cleanUpEffect)
}
